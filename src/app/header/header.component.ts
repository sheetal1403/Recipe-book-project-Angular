
import { Component, EventEmitter, Output, OnInit, OnDestroy} from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'

})

export class HeaderComponent implements OnInit, OnDestroy{

   userSub: Subscription;
   isAuthenticated = false;

   constructor(private dataStorageService: DataStorageService,
               private authService: AuthService){}

    ngOnInit(){
       this.userSub = this.authService.user.subscribe(user => {
            this.isAuthenticated = !!user;
            // console.log(!user);
            // console.log(!!user);
       });
    }    

    // onSelect(feature:string){
        
    //     this.featureSelected.emit(feature);
    // }

    onSaveRecipes(){
        this.dataStorageService.storeRecipes();
    }

    onFetchRecipes(){
        this.dataStorageService.fetchRecipes();
    }

    onLogout(){
        this.authService.logout();
    }

    ngOnDestroy(){
        this.userSub.unsubscribe();
    }


}