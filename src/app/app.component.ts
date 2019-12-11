import { Component, OnInit } from '@angular/core';
import { HttpService } from './app.http'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'protey-project';
  
  private users;
  private posts;
  private comments;
  private resultInfo = {
    posts:Array
      };

  private resultInfoUsers;
  private sortTurnOn:boolean = false;
  private saveFirstValue;
  private searchObj;

  private urlUser : string = 'https://jsonplaceholder.typicode.com/users';
  private urlPosts : string = 'https://jsonplaceholder.typicode.com/posts';
  private urlComments : string = 'https://jsonplaceholder.typicode.com/comments';

  constructor(private httpService:HttpService) {}

  private getUsersInfo (url:string) {
    let promise = this.httpService
    .getInfo(url).toPromise();
    promise.then((data) => {}) 
    .catch((error) => {
      console.log(error);
    })
    return promise;
  }

  private getNeedUser (id:number) {
    let returnArr = [];
    for (let index in this.users) {
      if (this.users[index].id === id) {
        returnArr.push(this.users[index]);
      }
    }
    return returnArr;
  }

  private getNeedComments (id:number) {
    let returnArr = [];
    for (let index in this.comments) {
      if (this.comments[index].postId === id) {
        returnArr.push(this.comments[index]);
      }
    }
    return returnArr;
  }

  private sortByCity () {
    if (!this.sortTurnOn) {
      this.sortTurnOn = !this.sortTurnOn;
      this.saveFirstValue = Object.assign([], this.resultInfoUsers);
      this.resultInfoUsers.sort(function(a, b){
        let nameA = a.user[0].address.city.toLowerCase(), nameB = b.user[0].address.city.toLowerCase()
        if (nameA < nameB)
          return -1
        if (nameA > nameB)
          return 1
        return 0
        })
    } else {
      this.resultInfoUsers = this.saveFirstValue;
      this.sortTurnOn = !this.sortTurnOn;
    }
  }

  private sortByPost () {
    if (!this.sortTurnOn) {
      this.sortTurnOn = !this.sortTurnOn;
      this.saveFirstValue = Object.assign([], this.resultInfoUsers);
      this.resultInfoUsers.sort(function(a, b){
        let nameA = a.title.toLowerCase(), nameB = b.title.toLowerCase()
        if (nameA < nameB)
          return -1
        if (nameA > nameB)
          return 1
        return 0
        })
    } else {
      this.resultInfoUsers = this.saveFirstValue;
      this.sortTurnOn = !this.sortTurnOn;
    }
  }

  private sortByName () {
    if (!this.sortTurnOn) {
      this.sortTurnOn = !this.sortTurnOn;
      this.saveFirstValue = Object.assign([], this.resultInfoUsers);
      this.resultInfoUsers.sort(function(a, b){
        let nameA = a.user[0].name.toLowerCase(), nameB = b.user[0].name.toLowerCase()
        if (nameA < nameB) //сортируем строки по возрастанию
          return -1
        if (nameA > nameB)
          return 1
        return 0 // Никакой сортировки
        })
    } else {
      this.sortTurnOn = !this.sortTurnOn;
      this.resultInfoUsers = this.saveFirstValue;
    }
  }

  private startSearch() {
    console.log(this.searchObj);
    if (this.searchObj !== undefined) {
      this.searchObj = this.searchObj.trim();
      // this.saveFirstValue = Object.assign([], this.resultInfoUsers);
      this.resultInfoUsers = this.saveFirstValue;
      this.resultInfoUsers = this.resultInfoUsers.filter(
        (e) => {
          if (e.title.includes(this.searchObj) || e.body.includes(this.searchObj) || e.user[0].name.includes(this.searchObj) || e.user[0].address.city.includes(this.searchObj)) {
            console.log(e);
            return e;
          }
        }
      )
    } else {
      this.resultInfoUsers = this.saveFirstValue;
    }
  }

  private async fetchData () {
    let asyncFunctions = [
      this.getUsersInfo(this.urlUser),
      this.getUsersInfo(this.urlPosts),
      this.getUsersInfo(this.urlComments)
    ];
    let results = await Promise.all(asyncFunctions);
    this.users = results[0];
    this.posts = results[1];
    this.comments = results[2];
    this.resultInfo.posts = this.posts;
    for (let post in this.resultInfo.posts) {
      this.resultInfo.posts[post].user = this.getNeedUser(this.resultInfo.posts[post].userId);
    }
    for (let post in this.resultInfo.posts) {
      this.resultInfo.posts[post].comments = this.getNeedComments(this.resultInfo.posts[post].id);
    }
    this.resultInfoUsers = this.resultInfo.posts;
    this.saveFirstValue = Object.assign([], this.resultInfoUsers);
    console.log(this.saveFirstValue);

  }
  ngOnInit(): void {
    this.fetchData();
  }
}
