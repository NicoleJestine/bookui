import { Component, OnInit } from '@angular/core';
import {LocalDataSource} from 'ng2-smart-table';
import {Multimedia} from '../../../../shared/domain/multimedia';
import {DatePipe} from '@angular/common';
import {AppUtil} from '../../../../conf/app-util';

@Component({
  selector: 'ngx-multimedia',
  templateUrl: './multimedia.component.html',
  styleUrls: ['./multimedia.component.scss'],
})
export class MultimediaComponent implements OnInit {

  source: LocalDataSource;
  settings = {
    noDataMessage: 'No multimedia found.',
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate: true,
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true,
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      multimediaName: {
        title: 'Name',
        type: 'string',
      },
      multimediaType: {
        title: 'Type',
        type: 'string',
      },
      multimediaLink: {
        title: 'Link',
        type: 'string',
      },
      dateCreated: {
        title: 'Date Created',
        type: 'string',
        addable: false,
        editable: false,
        valuePrepareFunction: (date) => {
          return new DatePipe('en-EN').transform(date, 'dd MMM yyyy HH:mm:ss');
        },
      },
    },
    pager: {
      perPage: 5,
    },
  };

  constructor() { }

  ngOnInit() {
    console.log(AppUtil.getId());
    const mm: Array<Multimedia> = [];
    const multimedia = new Multimedia();
    multimedia.multimediaId = AppUtil.getId();
    multimedia.multimediaLink = 'http://google.com';
    multimedia.multimediaName = 'Chapter 1';
    multimedia.multimediaType = 'video';
    mm.push(multimedia);

    this.source = new LocalDataSource(mm);
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  onCreateConfirm(event): void {
    console.log(event);
    const newMultimedia = event.newData;
    const multimedia = new Multimedia();
    multimedia.multimediaId = AppUtil.getId();
    multimedia.multimediaType = newMultimedia.multimediaType;
    multimedia.multimediaName = newMultimedia.multimediaName;
    multimedia.multimediaLink = newMultimedia.multimediaLink;
    event.confirm.resolve(multimedia);
  }

  onEditConfirm(event): void {
    console.log(event);
    const editedMultimedia = event.newData;
    // call service to edit/update multimedia here...
    event.confirm.resolve(editedMultimedia);
  }


}