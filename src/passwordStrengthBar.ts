import {Component, OnChanges, Input, Output, EventEmitter, SimpleChange} from '@angular/core';

@Component({
    selector: 'angular2-password-strength-bar',
    styles: [`
    ul.password__strength__bar {
        display:inline;
        list-style:none;
        margin:0;
        margin-left:15px;
        padding:0;
        vertical-align:2px;
    }
    .point:last {
        margin:0 !important;
    }
    .point {
        background:#DDD;
        border-radius:2px;
        display:inline-block;
        height:5px;
        margin-right:1px;
        width:20px;
    }`],
    template: `
    <div class="password__strength" #strength>
        <small>{{barLabel}}</small>
        <ul class="password__strength__bar">
            <li class="point" [style.background-color]="bar0"></li>
            <li class="point" [style.background-color]="bar1"></li>
            <li class="point" [style.background-color]="bar2"></li>
            <li class="point" [style.background-color]="bar3"></li>
            <li class="point" [style.background-color]="bar4"></li>
        </ul>
    </div>
`
})
export class PasswordStrengthBar implements OnChanges {

    @Input() passwordToCheck: string;
    @Input() barLabel: string;
    @Output() strengthChanged:EventEmitter = new EventEmitter();

    bar0: string;
    bar1: string;
    bar2: string;
    bar3: string;
    bar4: string;

    private colors = ['#F00', '#F90', '#FF0', '#9F0', '#0F0'];

    private static measureStrength(p: string) {
        let _force = 0;
        const _regex = /[$-/:-?{-~!"^_`\[\]]/g; // "

        const _lowerLetters = /[a-z]+/.test(p);
        const _upperLetters = /[A-Z]+/.test(p);
        const _numbers = /[0-9]+/.test(p);
        const _symbols = _regex.test(p);

        const _flags = [_lowerLetters, _upperLetters, _numbers, _symbols];

        let _passedMatches = 0;
        for (let _flag of _flags) {
            _passedMatches += _flag === true ? 1 : 0;
        }

        _force += 2 * p.length + ((p.length >= 10) ? 1 : 0);
        _force += _passedMatches * 10;

        // penality (short password)
        _force = (p.length <= 6) ? Math.min(_force, 10) : _force;

        // penality (poor variety of characters)
        _force = (_passedMatches === 1) ? Math.min(_force, 10) : _force;
        _force = (_passedMatches === 2) ? Math.min(_force, 20) : _force;
        _force = (_passedMatches === 3) ? Math.min(_force, 40) : _force;

        return _force;

    }
    private getColor(s: number) {
        let idx = 0;
        if (s <= 10) {
            idx = 0;
        }
        else if (s <= 20) {
            idx = 1;
        }
        else if (s <= 30) {
            idx = 2;
        }
        else if (s <= 40) {
            idx = 3;
        }
        else {
            idx = 4;
        }
        return {
            idx: idx + 1,
            col: this.colors[idx]
        };
    }

    getStrengthIndexAndColor(strength: number) {
        return this.getColor(strength);
    }

    ngOnChanges(changes: {[propName: string]: SimpleChange}): void {
        let password = changes['passwordToCheck'].currentValue;
        let strength = this.PasswordStrengthBar.measureStrength(password);
        this.setBarColors(5, '#DDD');
        if (password) {
            let c = this.getStrengthIndexAndColor(strength);
            this.setBarColors(c.idx, c.col);
            this.strengthChanged.emit(strength);
        }
    }

    private setBarColors(count: number, col: string) {
        for (let _n = 0; _n < count; _n++) {
            this['bar' + _n] = col;
        }
    }
}
