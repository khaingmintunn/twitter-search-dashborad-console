import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
declare var $: any;

@Component({
  selector: 'app-reply-message-dialog',
  templateUrl: './reply-message-dialog.component.html',
  styleUrls: ['./reply-message-dialog.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ReplyMessageDialogComponent implements OnInit {
  public messageText: string = '';
  public msgText: string = '';
  public maxChars = 270;
  public isDisabledSndBtn = true;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ReplyMessageDialogComponent>,
  ) { }

  ngOnInit(): void {
  }

  onTweetCompose() {
    const $highlights = $('.highlights');
    const $textarea = $('textarea');
    const text = $textarea.val();
    this.messageText = text;
    const highlightedText = this.applyHighlights(text);
    $highlights.html(highlightedText);
    this.handleScroll();
    if (text.length === 0 || text.length > this.maxChars) {
      this.isDisabledSndBtn = true;
    } else {
      this.isDisabledSndBtn = false;
    }
  }

  applyHighlights(text) {
    if (text.length >= this.maxChars) {
      const allowedValuePart = text.slice(0, this.maxChars);
      const refusedValuePart = text.slice(this.maxChars);
      text = allowedValuePart + '<mark style="border-radius: 3px;color: transparent;background-color: #fcc !important;' +
        'padding: 0px;">' + refusedValuePart + '</mark><br>';
    }
    return text;
  }

  handleScroll() {
    const $textarea = $('textarea');
    const $backdrop = $('.backdrop');
    const scrollTop = $textarea.scrollTop();
    $backdrop.scrollTop(scrollTop);
    const scrollLeft = $textarea.scrollLeft();
    $backdrop.scrollLeft(scrollLeft);
  }

}
