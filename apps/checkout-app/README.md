## Home micro application

**Note:** If CWD (current working directory) is `new-microapp` you can omit the `new-microapp` argument from the following commands.

### Start Dev Server

    $ orxe serve new-microapp

The start command should open a tab in your browser at http://localhost:3000/

**Note:** To start development server on a specific port, use the following command -

    $ orxe serve new-microapp --port 4200

### Run Tests without _--coverage_ option

    $ orxe test new-microapp

### Run Tests with _--coverage_ option

    $ orxe test new-microapp --coverage

You can add _--skip-axe_ as an argument to skip accessibility testing

    $ orxe test new-microapp --skip-axe

### Generate microapp build with single bundle

    $ orxe build <microapp-name>

### Generate microapp build with Angular framework extracted

    $ orxe build new-microapp --custom

Final build can be found at [microapp-name]/dist/[microapp-name]/main-\*.js

### Run Lint on microapp

    $ orxe lint new-microapp

You can fix the lint errors by using _--fix_ argument -

    $ orxe lint new-microapp --fix
