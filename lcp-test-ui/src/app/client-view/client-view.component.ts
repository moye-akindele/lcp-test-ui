import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Client } from '../models/client';
import { ClientService } from '../services/client.service';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-client-view',
  templateUrl: './client-view.component.html',
  styleUrls: ['./client-view.component.scss']
})
export class ClientViewComponent implements OnInit {

  cellTextLenght = 10;
  displayedColumns: string[] = ['firstName', 'lastName', 'actions'];
  dataSource: MatTableDataSource<Client>;

  isEditMode: boolean = false;
  selectedClient: Client;

  clientForm = new FormGroup({
    firstName: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
    ]),
    lastName: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
    ]),
  });

  clients: Client[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort: MatSort = new MatSort;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private clientService: ClientService,
  ) { 
    this.dataSource = new MatTableDataSource(this.clients);
  }

  ngOnInit(): void {
    this.refreshTable();
  }

  onSubmit() {

    let submittedClient = {
      firstName: this.clientForm.value.firstName,
      lastName: this.clientForm.value.lastName,
    } as Client;

    if (this.isEditMode) {
      this.editRecord(submittedClient);
    } else {
      this.createRecord(submittedClient);
    }
  }

  refreshTable() {
    this.clients = this.clients.sort((a, b) => (a.firstName > b.firstName) ? 1 : -1);
    this.dataSource = new MatTableDataSource<Client>(this.clients);

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.changeDetectorRef.detectChanges();
  }

  public resetForm() {
    this.isEditMode = false;
    this.selectedClient = new Client();

    this.clientForm.patchValue({
      firstName: '',
      lastName: '',
    });
  }

  public setEditMode(selectedClient: Client) {
    this.isEditMode = true;
    this.selectedClient = selectedClient;

    this.clientForm.patchValue({
      firstName: selectedClient.firstName,
      lastName: selectedClient.lastName,
    });
  }

  public createRecord(selectedClient: Client) {
    this.clientService.createClient(selectedClient).subscribe((result) => {
      this.refreshTable();
    });
  }

  public editRecord(selectedClient: Client) {
    this.clientService.updateClient(selectedClient).subscribe((result) => {
      this.refreshTable();
    });
  }

  public deleteRecord(selectedClient: Client) {
    this.clientService.deleteClient(selectedClient.id).subscribe((result) => {
      this.refreshTable();
    });
  }

}
