import {Component, OnInit} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {map, Observable, of} from "rxjs";
import {ImageCrudService} from "../../../services/image.crud.service";
import {ImageCrudModel} from "../../../models/image-crud.model";
import {AsyncPipe, NgIf} from "@angular/common";

@Component({
	selector: 'app-image-crud',
	standalone: true,
	templateUrl: './image-crud.component.html',
	imports: [
		ReactiveFormsModule,
		NgIf,
		AsyncPipe
	],
	styleUrls: ['./image-crud.component.scss']
})
export class ImageCrudComponent implements OnInit {

	form = this._fb.group({
		mainImage: ['', Validators.required],
		imageUrl: ['', Validators.required],
	})

	isSubmit: Observable<boolean> = this.form.statusChanges.pipe(
		map(status => status === 'VALID')
	);

	isValidSrc$: Observable<boolean> = this.form.controls.imageUrl.valueChanges.pipe(
		map(() => this.form.controls.imageUrl.valid)
	);

	isCreated$: Observable<boolean> = of(false);

	constructor(
		private _fb: FormBuilder,
		private _imageCrudService: ImageCrudService) {
	}

	ngOnInit(): void {
		this.form.statusChanges
			.pipe(
				map(value => {
					if (value === 'VALID') return 1;
					if (value === 'INVALID') return 2;
					return 0
				})
			)
			.subscribe();
	}

	createImage(): void {
		if (this.form.valid) {
			const value = this.form.value;
			let image: ImageCrudModel = {
				imageUrl: value.imageUrl!,
				mainImage: value.mainImage! === 'true'
			};
			this.isCreated$ = this._imageCrudService.createImage(image);
		}
	}
}
