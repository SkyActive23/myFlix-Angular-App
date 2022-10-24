import { Component, OnInit, Inject } from '@angular/core';

import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-movie-director',
  templateUrl: './movie-director.component.html',
  styleUrls: ['./movie-director.component.scss']
})
export class MovieDirectorComponent implements OnInit {

  /**
   * Injects data from the MovieCard component using the MAT_DIALOG_DATA injection token.
   * The data can be accessed to populate the view.
   * @param data
   */
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      name: string;
      bio: string;
    }
  ) { }

  ngOnInit(): void {
  }

}
