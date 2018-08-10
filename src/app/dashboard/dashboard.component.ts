import { Component, OnInit } from '@angular/core';
import {map, tap} from 'rxjs/operators';
import { Breakpoints, BreakpointState, BreakpointObserver } from '@angular/cdk/layout';
import { PhoenixSocket } from '../services/phoenix.socket';

const socketUrl = `ws://localhost:4000/socket`;
// const url = `wss://7777b1b8.au.ngrok.io/socket`;
const phoenixSocket = new PhoenixSocket(socketUrl);
export const HAS_NEW_FEEDS = 'app/FeedsPage/HAS_NEW_FEEDS';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Card 1', cols: 1, rows: 1 },
          { title: 'Card 2', cols: 1, rows: 1 },
          { title: 'Card 3', cols: 1, rows: 1 },
          { title: 'Card 4', cols: 1, rows: 1 }
        ];
      }

      return [
        { title: 'Card 1', cols: 2, rows: 1 },
        { title: 'Card 2', cols: 1, rows: 1 },
        { title: 'Card 3', cols: 1, rows: 2 },
        { title: 'Card 4', cols: 1, rows: 1 }
      ];
    })
  );

  constructor(private breakpointObserver: BreakpointObserver) {}

  ngOnInit() {
    const feedsChannel = phoenixSocket.channel('feeds', {});
    feedsChannel.join().subscribe((response) => {
      console.log(response);
    });

    const newFeedEvent$ = feedsChannel.messages(HAS_NEW_FEEDS);
    newFeedEvent$.pipe(
      tap(event => {
        console.log(event);
      })
    ).subscribe();
  }
}
