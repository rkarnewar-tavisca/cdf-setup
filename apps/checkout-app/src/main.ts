import './components';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { initShellClient } from '@orxe-devkit/shell-client';
import { environment } from './environments/environment';


initShellClient({
  userHook: { baseUrl: environment.shellBaseUrl }
}).then((res) => {
  platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch((err) => console.error(err));
});

