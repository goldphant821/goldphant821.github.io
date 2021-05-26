/*
*   This content is licensed according to the W3C Software License at
*   https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
*
* ARIA Combobox Examples
*/
class VehicleSelComboItem {
  constructor(Id) {
    this.id = Id;
    this.comboboxId = `${this.id}-combobox`;
    this.inputId = `${this.id}-input`;
    this.listBoxId = `${this.id}-listbox`;
    this.arrowId = `${this.id}-combobox-arrow`;
    this.lists = [];
    this.searchVeggies = this.searchVeggies.bind(this);
    this.onShow = this.onShow.bind(this);
    this.onHide = this.onHide.bind(this);
    this.arrowOnClick = this.arrowOnClick.bind(this);
    this.setLists = this.setLists.bind(this);
    this.listBoxCombo = new aria.ListboxCombobox(
      document.getElementById(this.comboboxId),
      document.getElementById(this.inputId),
      document.getElementById(this.listBoxId),
      this.searchVeggies,
      true,
      this.onShow,
      this.onHide
    );
    document.getElementById(this.arrowId).addEventListener(
      'click',
      this.arrowOnClick
    );
  }
  arrowOnClick() {
    if (this.listBoxCombo.shown) {
      document.getElementById(this.inputId).focus();
      this.listBoxCombo.hideListbox();
    }
    else {
      document.getElementById(this.inputId).focus();
      this.listBoxCombo.updateResults(true);
    }
  }
  onShow() {
    document.getElementById(this.arrowId)
      .setAttribute('aria-label', 'Hide vegetable options');
  }
  onHide() {
    document.getElementById(this.arrowId)
      .setAttribute('aria-label', 'Show vegetable options');
  }
  searchVeggies(searchString) {
    var results = [];
    for (var i = 0; i < this.lists.length; i++) {
      var veggie = this.lists[i].toLowerCase();
      if (veggie.indexOf(searchString.toLowerCase()) === 0) {
        results.push(this.lists[i]);
      }
    }

    return results;
  }
  setLists(_lists) {
    this.lists = [..._lists];
    document.getElementById(this.inputId).value = '';
  }
  async fetchData(url, defaultData) {
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const apiUrl = url;
    try {
      const response = await fetch(proxyUrl + apiUrl, {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json'
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer'// no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      });
      var data = await response.text();
      var res = data ? data.split('@') : [];
      this.setLists(res);
    } catch (error) {
      console.log(error);
    }
  }
}
class VehicleSelector {
  constructor(params) {
    this.yearSel = new VehicleSelComboItem(params.yearSelId);
    this.markSel = new VehicleSelComboItem(params.markSelId);
    this.methodSel = new VehicleSelComboItem(params.methodSelId);
    this.yearSel.fetchData('https://www.partsgeek.com/ajax/?ac=gys', params.year ? params.year : '');
    this.yearSelect = this.yearSelect.bind(this);
    this.markSelect = this.markSelect.bind(this);
    this.methodSelect = this.methodSelect.bind(this);
    this.selectedYear;
    this.selectedMark;
    this.selectedMethod;
  }
  yearSelect(year) {

  }
  markSelect(mark) {

  }
  methodSelect(method) {

  }
}
var FRUITS_AND_VEGGIES = [
  'Apple',
  'Artichoke',
  'Asparagus',
  'Banana',
  'Beets',
  'Bell pepper',
  'Broccoli',
  'Brussels sprout',
  'Cabbage',
  'Carrot',
  'Cauliflower',
  'Celery',
  'Chard',
  'Chicory',
  'Corn',
  'Cucumber',
  'Daikon',
  'Date',
  'Edamame',
  'Eggplant',
  'Elderberry'
];

/**
 * @function onload
 * @desc Initialize the combobox examples once the page has loaded
 */
window.addEventListener('load', function () {
  var _vehicleYearCombo = new VehicleSelector({
    yearSelId: 'vehicle_year',
    markSelId: 'vehicle_mark',
    methodSelId: 'vehicle_method',
    year: '',
    mark: '',
    method: '',
    search: ''
  });

});

