import { Component, OnInit, Input } from '@angular/core';
import { HttpService } from '../app.http'
import dialogPolyfill from 'dialog-polyfill';


@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  private elementOfDialog;
  private textOfPost;
  private comments;
  private showDialog:boolean = false;

  @Input('userItem') user: {
    id: number
  };
  @Input('indexIter') indexIt:number;

  constructor(private httpService:HttpService) { }

  
  private textToDialo(text){
    this.textOfPost = text.title;
    this.comments = text.comments;
    this.showDialog = !this.showDialog;
    this.elementOfDialog.showModal();
    setTimeout(() => {
      document.body.addEventListener("click" , () => {
        this.elementOfDialog.close();
        this.showDialog = false;
      }, {
        once: true
      })
    }, 0)
  };
  
  ngOnInit() {
    this.elementOfDialog = document.querySelectorAll('dialog')[this.indexIt];
    dialogPolyfill.registerDialog(this.elementOfDialog);
  }

}
