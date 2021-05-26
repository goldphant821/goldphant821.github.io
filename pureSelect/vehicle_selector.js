/*
*   This content is licensed according to the W3C Software License at
*   https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
*
* ARIA Combobox Examples
*/
class VehicleSelComboItem {
  constructor(Id, _onSelect) {
    this.id = Id;
    this.comboboxId = `${this.id}-combobox`;
    this.inputId = `${this.id}-input`;
    this.listBoxId = `${this.id}-listbox`;
    this.arrowId = `${this.id}-combobox-arrow`;
    this.containerId = `${this.id}-container`;
    this.lists = [];
    this.searchVeggies = this.searchVeggies.bind(this);
    this.onShow = this.onShow.bind(this);
    this.onHide = this.onHide.bind(this);
    this.onSelect = _onSelect || function () { };
    this.arrowOnClick = this.arrowOnClick.bind(this);
    this.setLists = this.setLists.bind(this);
    this.listBoxCombo = new aria.ListboxCombobox(
      document.getElementById(this.comboboxId),
      document.getElementById(this.inputId),
      document.getElementById(this.listBoxId),
      document.getElementById(this.containerId),
      this.searchVeggies,
      true,
      this.onShow,
      this.onHide,
      this.onSelect
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
      if (res && res.length > 0) {
        document.getElementById(`${this.id}-container`).classList.remove("vehicle_container--hidden");
      }
    } catch (error) {
      console.log(error);
    }
  }
}
class VehicleSelector {
  constructor(params) {
    this.yearSelect = this.yearSelect.bind(this);
    this.markSelect = this.markSelect.bind(this);
    this.modelSelect = this.modelSelect.bind(this);
    this.yearSelContainerId = `${params.yearSelId}-container`;
    this.markSelContainerId = `${params.markSelId}-container`;
    this.modelSelContainerId = `${params.modelSelId}-container`;
    this.yearSel = new VehicleSelComboItem(params.yearSelId, this.yearSelect);
    this.markSel = new VehicleSelComboItem(params.markSelId, this.markSelect);
    this.modelSel = new VehicleSelComboItem(params.modelSelId, this.modelSelect);
    document.getElementById(this.markSelContainerId).classList.add("vehicle_container--hidden");
    document.getElementById(this.modelSelContainerId).classList.add("vehicle_container--hidden");
    this.yearSel.fetchData('https://www.partsgeek.com/ajax/?ac=gys', params.year ? params.year : '');

    this.selectedYear;
    this.selectedMark;
    this.selectedMethod;
  }
  yearSelect(year) {
    this.selectedYear = year;
    document.getElementById(this.markSelContainerId).classList.add("vehicle_container--hidden");
    document.getElementById(this.modelSelContainerId).classList.add("vehicle_container--hidden");
    this.markSel.fetchData(`https://www.partsgeek.com/ajax/?ac=gmby&year=${year}`, '');

  }
  markSelect(mark) {
    this.selectedMark = mark;
    document.getElementById(this.modelSelContainerId).classList.add("vehicle_container--hidden");
    this.modelSel.fetchData(`https://www.partsgeek.com/ajax/?ac=gmbym&year=${this.selectedYear}&mark=${mark}`, '');
  }
  modelSelect(method) {
    location.href = `https://www.partsgeek.com/ym/?year=${this.selectedYear}&mark=${this.selectedMark}&model=${method}`;
  }
}

/**
 * @function onload
 * @desc Initialize the combobox examples once the page has loaded
 */
window.addEventListener('load', function () {
  var _vehicleYearCombo = new VehicleSelector({
    yearSelId: 'vehicle_year',
    markSelId: 'vehicle_mark',
    modelSelId: 'vehicle_model',
    year: '',
    mark: '',
    method: '',
    search: ''
  });

});

