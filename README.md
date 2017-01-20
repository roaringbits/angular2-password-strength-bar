# angular2-password-strength-bar

This is a fork of [rnadler/ng2-password-strength-bar](https://github.com/rnadler/ng2-password-strength-bar)

## Install in your project

`npm install angular2-password-strength-bar --save`

## Using the Component
### Add Component to Module imports
```
import { PasswordStrengthBar } from 'angular2-password-strength-bar';
...
@NgModule({
 ...
   declarations: [
        AppComponent,
        PasswordStrengthBar,
        ...
    ],
    imports: [
      BrowserModule,
      FormsModule,
      ...
 ...
})
export class AppModule {}
```
### Add Component to your Application
```
@Component({
    selector: 'my-app',
    template: `
  <h3>Angular 2 Password Strength Bar</h3>
    <div>
       <form name="myForm" novalidate>
            <input type="password" class="form-control" id="password" name="password" placeholder="Enter password"
                 [(ngModel)]="account.password" #password="ngModel"
                 minlength="5" maxlength="50" required>
            <angular2-password-strength-bar
                [passwordToCheck]="account.password"
                [barLabel]="barLabel">
            </angular2-password-strength-bar>
        </form>        
    </div>
  `,
})
export class App {
    public account = {
        password: <string>null
    };
    public barLabel: string = "Password strength:";
    // ...
}
```
### Parameters

\<angular2-password-strength-bar \(**strengthChanged**)\="strengthChanged($event)" \[**passwordToCheck**\]="account.password"  \[**barLabel**\]="barLabel"\> \</angular2-password-strength-bar\>

### Out Parameters

#### strengthChanged (type: eventEmitter)

- Emits updated strength if any changes occurred

#### passwordToCheck (type: string)

- The variable containing the password to check.

#### barLabel (type: string)

- The variable containing the label displayed to the left of the bar.

## Run the example application locally
- `git clone https://github.com/roaringbits/angular2-password-strength-bar.git`
- `cd angular2-password-strength-bar`
- `npm install`
- `npm start` # Browser should open automatically on http://localhost:3000

## Run the tests locally
- Same as above, except for the last step do:
- `npm run test-once`  # Defaults to a Firefox browser

### License

[MIT](https://tldrlegal.com/license/mit-license)
