const Generator = require('yeoman-generator');

module.exports = class extends Generator {
    prompting () {
        const prompts = [{
                type:    'list',
                name:    'createFuture',
                message: 'What do you want to make today?',
                choices: [
                    'Component',
                ],
            }];
        return this.prompt(prompts).then((props) => {
            this.props = props;
        });
    }

    Writing () {
        const { createFuture } = this.props;

        switch (createFuture) {
            case 'Component':
                this.composeWith(require.resolve('../component'), {});
                break;
            default:
                break;
        }
    }
};