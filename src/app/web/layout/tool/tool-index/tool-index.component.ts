import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-tool-index',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './tool-index.component.html',
  styleUrl: './tool-index.component.css'
})
export class ToolIndexComponent {

  constructor(){}

  ngOnInit(): void {
    if (typeof localStorage != 'undefined') {
      localStorage.setItem('currentPage', '/proposal')
    }
  }

}
