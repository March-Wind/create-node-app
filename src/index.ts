import { Listr } from 'listr2'
import { execaSync, execa } from 'execa'
import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'node:path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
interface Ctx {
    /* some variables for internal use */
}
const tasks = new Listr<Ctx>(
    [
        {
            title: 'npm init',
            task: (ctx, task) => {
                const instance = execaSync('npm', ['init'],
                { 
                    stdio: 'inherit', 
                    shell: true,
                })
            },
            options: { persistentOutput: true }
        },
        {
            title: 'create Build environment',
            task: (ctx,task) => {
                return task.newListr([
                    {
                        title: 'install typescrpt env',
                        task: () => {
                             execaSync('npm', ['i', '-D',
                                '@types/node',
                                'ts-node@10.9.1',
                                'tslib@2.4.1',
                                'typescript@4.9.4',
                                'tsconfig-paths@4.1.1',
                                "tsc-alias@1.8.2"
                            ]);
                        }
                    },
                    {
                        title: 'install webpack env',
                        task: () => {
                            return execaSync('npm', ['i', '-D', 
                                'webpack@5.75.0',
                                'webpack-cli@5.0.1',
                            ]);
                        }
                    },
                    {
                        title: 'install babel component',
                        task: () => {
                            return execaSync('npm', ['i', '-D', 
                                "@babel/core@7.20.5",
                                "@babel/plugin-proposal-class-properties@7.18.6",
                                "@babel/plugin-proposal-decorators@7.20.5",
                                "@babel/plugin-proposal-object-rest-spread@7.20.2",
                                "@babel/preset-env@7.20.2",
                                "@babel/preset-typescript@7.18.6",
                                "babel-loader@9.1.0",
                                "core-js@3.26.1",
                            ]);
                        }
                    },
                ])
                
            }
        },

        {
            title: 'Set script and main ',
            task: () => {
                const packagePath = path.resolve(process.cwd(), './package.json');
                const configString = fs.readFileSync(packagePath, { encoding: 'utf8' });
                let configObj:any = {};
                try {
                    configObj = JSON.parse(configString);
                } catch (error) {
                    throw new Error('package.json 解析错误！')
                }
                configObj.scripts = {
                    "dev": "node --loader ts-node/esm ./src/index.ts",
                    "dev2": "ts-node ./src/index.ts",
                    "dev:debug": " node --inspect-brk  --loader ts-node/esm ./src/index.ts",
                    "build:js": "npm run clean:lib && tsc && tsc-alias",
                    "build:prod": "webpack"
                }
                configObj.main = "./dist/index.js";
                configObj.type = "module";
                configObj.files = [
                    "dist/*",
                    "*.md",
                    "package.json"
                  ]
                fs.writeFileSync(packagePath, JSON.stringify(configObj, null, 4), { encoding: 'utf-8' });
            }
        },
        {
            title: 'set config file',
            task: (ctx, task) => {
                return task.newListr([
                    {
                        title: 'set tsconfig',
                        task: () => {
                            return execa('cp',  [path.resolve(__dirname, './template/tsconfig.json'), process.cwd()])
                        }
                    },
                    {
                        title: 'set webpack config',
                        task: () => execa('cp',  [path.resolve(__dirname, './template/webpack.config.js'), process.cwd()])
                    },
                    {
                        title: 'set babel config',
                        task: () => execa('cp',  [path.resolve(__dirname, './template/babel.config.js'), process.cwd()])
                    },
                    {
                        title: 'set .gitignore',
                        task: () => {
                            return  execa('cp',  [path.resolve(__dirname, './template/.gitignore'), process.cwd()])
                        }
                    },
                    {
                        title: 'set .npmignore',
                        task: () => execa('cp',  [path.resolve(__dirname, './template/.npmignore'), process.cwd()])
                    },
                ])
            }
        },
        {
            title: 'New src directory',
            task: () => {
                fs.mkdirSync('src')
                execaSync('cp',[path.resolve(__dirname, './template/src/index.ts'), path.resolve(process.cwd(),'src')])
            }
        },
        {
            title: 'add eslint and jest',
            task: (ctx, task) => {
                execaSync('npx',['--ignore-existing','@marchyang/project-helper'])
            }
        },
    ],
    {
        /* options */
    }
)

const fn = async () => {
    try {
        await tasks.run()
    } catch (e) {
        console.error(e)
    }
}

fn()