const Generator = require("yeoman-generator");
const {camelCase} = require("camel-case");

module.exports = class extends Generator {
    prompting() {
        const prompts = [
            {
                type: "input",
                name: "componentName",
                message: "Component Name:",
                default: ""
            },
            {
                type: "confirm",
                name: "wrap",
                message: "Want to wrap in the components folder?",
                default: false
            },
            {
                type: "checkbox",
                name: "features",
                message: "Select features",
                choices: [
                    {
                        name: 'styles',
                        checked: true
                    },
                    {
                        name: 'propTypes',
                        checked: true
                    }
                ]
            }
        ];

        return this.prompt(prompts).then(props => {
            this.props = props;
        });
    }

    Writing() {
        const { componentName, features, wrap } = this.props;
        if (componentName !== "") {
            console.log(features);
            const path = wrap ? `./components/${componentName}/` : `./${componentName}`;
              this.fs.copyTpl(
                this.templatePath("index.ejs"),
                this.destinationPath(
                    `${path}/index.tsx`
                ),
                { name: componentName, className: camelCase(componentName), features }
            );
            if(features.includes('styles')) {
                this.fs.copyTpl(
                  this.templatePath("styles.ejs"),
                  this.destinationPath(
                    `${path}/styles.ts`
                  ),
                  {name: camelCase(componentName), features}
                );
            }
            this.spawnCommand('rm', ['-r', './.yo-repository']);
        }
    }

};
