import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {PlpService} from "../../services/product/plp/plp.service";
import {DronePlp} from "../../models/product/drone-plp";
import {DataTableResponse} from "../../models/wrapers/data-table.response";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {AppPriceUtil} from "../../app.price-util";

@Component({
	selector: 'app-plp',
	standalone: true,
	templateUrl: './plp.component.html',
	imports: [
		AsyncPipe,
		NgIf,
		NgForOf
	],
	styleUrls: ['./plp.component.scss']
})
export class PlpComponent implements OnInit {

	plpList$: Observable<DataTableResponse<DronePlp>> | undefined;
	brand: string = 'all';
	category: string = 'all';

	constructor(private _plpService: PlpService, private _router: Router) {
		const params: string = this._router.routerState.snapshot.url.split('/')[2];
		if (params !== undefined) {
			if (params === 'brand')
				this.brand = this._router.routerState.snapshot.url.split('/')[3];
			if (params === 'category')
				this.category = this._router.routerState.snapshot.url.split('/')[3];
		}
	}

	ngOnInit(): void {
		this.plpList$ = this._plpService.loadAllProducts(this.brand, this.category) as Observable<DataTableResponse<DronePlp>>;
	}

	redirectToPdp(productId: number): void {
		this._router.navigateByUrl('/pdp/' + productId);
	}

	showPage(page: number): void {
		this.plpList$ = this._plpService.loadAllProducts(this.brand, this.category, page) as Observable<DataTableResponse<DronePlp>>;
	}

	protected readonly AppPriceUtil = AppPriceUtil;
}
