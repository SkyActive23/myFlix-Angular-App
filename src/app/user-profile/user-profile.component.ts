import { Component, OnInit } from '@angular/core';
//API
import { FetchApiDataService } from '../fetch-api-data.service';
//Component
import { UserProfileEditComponent } from '../user-profile-edit/user-profile-edit.component';
//Material design
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  user: any = {};
  movies: any = [];
  favs: any = [];


  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public router: Router,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    const user = localStorage.getItem('user');
    this.fetchApiData.getUser().subscribe((resp: any) => {
      this.user = resp;
      console.log(this.user);
      this.getFavs();
      console.log(this.getFavs())
    })
  }

  openEditProfileDialog(): void {
    this.dialog.open(UserProfileEditComponent, {
      width: '300px'
    })
  }

  deleteProfile(): void {
    if (confirm('Do you really want to delete this account?')) {
      this.router.navigate(['welcome']).then(() => {
        this.snackBar.open('You have successfully deleted your account!', 'OK', {
          duration: 2000
        });
      })
      this.fetchApiData.deleteUser().subscribe((result) => {
        console.log(result);
        localStorage.clear();
      });
    }
  }

    /**
   * Filters out movies that aren't in favs
   */
     getFavs(): void {
      this.fetchApiData.getAllMovies().subscribe((res: any) => {
        this.favs = res.filter((movie: any) => {
          return this.user.FavouriteMovies.includes(movie._id)
        });
        console.log(this.favs);
        return this.favs;
      })
    }
  
    /**
     * Allows user to remove movie from favs
     * @param id 
     */
    removeFav(id: string): void {
      this.fetchApiData.removeFavoriteMovie(id).subscribe((res: any) => {
        this.snackBar.open('Successfully removed from favorite movies.', 'OK', {
          duration: 2000,
        });
        this.ngOnInit();
        return this.favs;
      })
    }

}
