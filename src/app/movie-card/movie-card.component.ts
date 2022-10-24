import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { MovieDirectorComponent } from '../movie-director/movie-director.component';
import { SynopsisComponent } from '../synopsis/synopsis.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {

  movies: any[] = [];
  favs: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) { }

  /**
   * Gets all the movies using API service and populate local state variable
   * @returns array of movies objects
   * @function getMovies
   */
  ngOnInit(): void {
    this.getMovies();
    this.getFavs();
  }

  /**
   * Opens the director dialog from DirectorComponent
   * @param name: string[]
   * @function openDirectorDialog
   */
  openDirectorDialog(name: string, bio: string): void {
    this.dialog.open(MovieDirectorComponent, {
      data: { name, bio },
    });
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  /**
   * Opens the synopsys dialog from SynopsysComponent
   * @param title
   * @param description
   * @function openSynopsisDialog
   */
  openSynopsisDialog(title: string, description: string): void {
    this.dialog.open(SynopsisComponent, {
      data: {
        Title: title,
        Description: description,
        Genre: name,
      },
    });
  }

  /**
   * Get users favorite movies
   */
   getFavs(): void {
    this.fetchApiData.getUser().subscribe((resp: any) => {
      this.favs = resp.FavoriteMovies;
      console.log("HELLO THIS FAVS", this.favs);
      return this.favs;
    });
  }

  /**
   * Checks if movie if favorited
   * @param id 
   * @returns 
   */
   isFav(id: string): boolean {
    return this.favs.includes(id);
  }

  /**
   * Add a movie to the list of favorite movies using API service
   * @param id
   * @function addToFavoriteMovies
   */

  /**
   * Adds a favorite movie
   * @param id 
   */
   handleFavorite(id: string): void {
    this.fetchApiData.addFavoriteMovie(id).subscribe(() => {
      this.getFavs();
      this.snackBar.open('Movie was successfully added to favorites', 'OK', {
        duration: 2000
      });
      console.log(this.getFavs())
    })
  }

  /**
   * Deletes a favorite movie
   * @param id 
   */
  handleUnfavorite(id: string): void {
    this.fetchApiData.removeFavoriteMovie(id).subscribe(() => {
      this.getFavs();
      this.snackBar.open('Movie was successfully removed from favorites', 'OK', {
        duration: 2000
      });
    })
  }
}
