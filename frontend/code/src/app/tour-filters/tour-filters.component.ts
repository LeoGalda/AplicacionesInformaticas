import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TourSolverService } from '../tour-solver.service';
import { TourResult } from '../tour-result/TourResult';
import { tap } from 'rxjs/operators';
import { TourRequest, OnCityFilter } from './TourRequest';

@Component({
  selector: 'app-tour-filters',
  templateUrl: './tour-filters.component.html',
  styleUrls: ['./tour-filters.component.css']
})
export class TourFiltersComponent implements OnInit {

  @Output() search: EventEmitter<TourResult> = new EventEmitter<TourResult>();
  tourRequest: TourRequest = new TourRequest();
  citiesFilters = {};
  constructor(
    private tourSolverService: TourSolverService
  ) { }

  ngOnInit() {
    this.addPlace();
  }

  buscar() {
    this.tourRequest.filters['oncity'] = []
    for (let i = 0; i < this.tourRequest.toVisit.length; i++) {
      for (const cityFilter of this.citiesFilters[i]) {
        cityFilter.cityName = this.tourRequest.toVisit[i];
        this.tourRequest.filters['oncity'].push(cityFilter);
      }
    }

    this.tourSolverService.getTourResult(this.tourRequest)
      .pipe(
        tap(tour => console.log(tour))
      )
      .subscribe(tour => this.search.emit(tour));
  }

  addPlace() {
    this.tourRequest.toVisit.push('');
    this.citiesFilters[this.tourRequest.toVisit.length - 1] = [];
  }

  addStayAtLeastFilter(index: number) {
    this.citiesFilters[index].push(new OnCityFilter('Stay in city for at least', null, null));
  }

  trackByFn(index: any, item: any) {
    return index;
  }
}
