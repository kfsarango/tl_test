import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  dataUser: any;
  constructor(private activatedRouter: ActivatedRoute) {
    activatedRouter.queryParams.subscribe(params => {
      this.dataUser = JSON.parse(params['user']);
      console.log(this.dataUser)
    });
  }

  ngOnInit() {
  }

}
