import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';

import { ItemService } from './../providers/item/item.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userName = '';
  user_id = '';
  warning = false;
  warningmsg = '';
  items: any = null;

  constructor(
    private itemService: ItemService, 
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() { 
    this.route.params.subscribe(params => {
      this.userName = params['userName'];
      this.user_id = params['user_id'];

      this.itemService.getItems(this.user_id)
      .subscribe(
        result => {
          // Handle result
          //console.log(result);
          this.items = result;
        },
        error => {
          //console.log(error);
        },
        () => {
          // 'onCompleted' callback.
          this.warning = false;
        }
      );
    });
  }

  onSubmit(f:any): void {
    if (f.itemName === '') {
      this.warningmsg = 'Item Name is required.';
      this.warning = true;
    } else {
      this.itemService.create(this.user_id, f.itemName, f.description)
      .subscribe(
        result => {
          // Handle result
          //console.log(result);
          this.items.push(result);
        },
        error => {
          //console.log(error);
          this.warningmsg = 'Item creation unsuccessful. Item alreasy exists in list.';
          this.warning = true;
        },
        () => {
          // 'onCompleted' callback.
          this.warning = false;
        }
      );
    }
  }

  onEdit(id) {
    this.router.navigate(['edit', {userName: this.userName, user_id: this.user_id, item_id: id}]);
  }

  onDelete(id) {
    this.itemService.delete(id)
    .subscribe(
      result => {
        // Handle result
        //console.log(result);

        let allItems = this.items;
        var filteredItems = allItems.filter((item) => item._id !== result._id);
    
        this.items = filteredItems;
      },
      error => {
        //console.log(error);
      },
      () => {
        // 'onCompleted' callback.
        this.warning = false;
      }
    );
  }

}
