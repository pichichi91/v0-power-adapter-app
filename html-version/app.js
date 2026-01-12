$(document).ready(function() {
  // State management
  const state = {
    selectedContinents: [],
    selectedPlugTypes: [],
    searchQuery: '',
    originCountry: '',
    destinationCountry: '',
    modalPlugType: null
  };

  // Initialize based on current page
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  
  if (currentPage === 'index.html' || currentPage === '') {
    initBrowsePage();
  } else if (currentPage === 'travel.html') {
    initTravelPage();
  }

  // Browse Page Functions
  function initBrowsePage() {
    // Get unique values
    const allContinents = [...new Set(adapterData.map(item => item.continent))].sort();
    const allPlugTypes = [...new Set(adapterData.flatMap(item => item.types))].sort();

    // Render continents
    renderContinents(allContinents);
    
    // Render plug types
    renderPlugTypes(allPlugTypes);

    // Render reference list
    renderReferenceList();

    // Event handlers
    $('#searchInput').on('input', function() {
      state.searchQuery = $(this).val();
      updateFilters();
      renderCountries();
    });

    $('#clearBtn').on('click', function() {
      state.selectedContinents = [];
      state.selectedPlugTypes = [];
      state.searchQuery = '';
      $('#searchInput').val('');
      updateFilters();
      renderCountries();
    });

    // Modal handlers
    $('#modalClose').on('click', function() {
      closeModal();
    });
    
    $('#modalOverlay').on('click', function(e) {
      if (e.target === this) {
        closeModal();
      }
    });

    // Initial render
    renderCountries();
  }

  function renderContinents(continents) {
    const $grid = $('#continentGrid');
    $grid.empty();

    continents.forEach(continent => {
      const $btn = $('<button>')
        .addClass('continent-btn')
        .attr('data-continent', continent)
        .html(`
          <span class="continent-icon">${getContinentIcon(continent)}</span>
          <span class="continent-label">${continent}</span>
        `);

      $btn.on('click', function() {
        const continent = $(this).attr('data-continent');
        toggleContinent(continent);
      });

      $grid.append($btn);
    });

    updateFilters();
  }

  function renderPlugTypes(plugTypes) {
    const $grid = $('#plugGrid');
    $grid.empty();

    plugTypes.forEach(type => {
      const $btn = $('<button>')
        .addClass('plug-btn')
        .attr('data-type', type)
        .html(`
          <div class="plug-button">
            <div class="plug-icon">${getPlugIcon(type)}</div>
          </div>
          <span class="plug-label">Type ${type}</span>
        `);

      $btn.on('click', function() {
        const type = $(this).attr('data-type');
        if (!$(this).hasClass('disabled')) {
          togglePlugType(type);
        }
      });

      $grid.append($btn);
    });

    // Add reset button
    const $resetBtn = $('<button>')
      .addClass('reset-btn')
      .html(`
        <div class="reset-icon">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
          </svg>
        </div>
        <span class="reset-label">Reset</span>
      `);

    $resetBtn.on('click', function() {
      state.selectedContinents = [];
      state.selectedPlugTypes = [];
      state.searchQuery = '';
      $('#searchInput').val('');
      updateFilters();
      renderCountries();
    });

    $grid.append($resetBtn);
    updateFilters();
  }

  function renderReferenceList() {
    const $list = $('#referenceList');
    $list.empty();

    const plugTypes = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O'];
    
    plugTypes.forEach(type => {
      const $item = $('<button>')
        .addClass('reference-item')
        .html(`
          <div class="reference-plug">
            <div class="reference-plug-icon">${getPlugIcon(type)}</div>
            <span class="plug-mini-label">${type}</span>
          </div>
          <div class="reference-info">
            <div class="reference-type">Type ${type}</div>
            <div class="reference-desc">${plugDescriptions[type]}</div>
          </div>
        `);

      $item.on('click', function() {
        openModal(type);
      });

      $list.append($item);
    });
  }

  function toggleContinent(continent) {
    const index = state.selectedContinents.indexOf(continent);
    if (index > -1) {
      state.selectedContinents.splice(index, 1);
    } else {
      state.selectedContinents.push(continent);
    }

    // Update available plug types
    updateAvailablePlugTypes();
    updateFilters();
    renderCountries();
  }

  function togglePlugType(type) {
    const index = state.selectedPlugTypes.indexOf(type);
    if (index > -1) {
      state.selectedPlugTypes.splice(index, 1);
    } else {
      state.selectedPlugTypes.push(type);
    }
    updateFilters();
    renderCountries();
  }

  function updateAvailablePlugTypes() {
    // Filter data by selected continents
    let filteredData = adapterData;
    if (state.selectedContinents.length > 0) {
      filteredData = adapterData.filter(item => 
        state.selectedContinents.includes(item.continent)
      );
    }

    // Get available plug types
    const availableTypes = [...new Set(filteredData.flatMap(item => item.types))];

    // Update plug type buttons
    $('.plug-btn[data-type]').each(function() {
      const type = $(this).attr('data-type');
      const isAvailable = availableTypes.includes(type);
      const isSelected = state.selectedPlugTypes.includes(type);

      if (!isAvailable) {
        $(this).addClass('disabled');
        $(this).find('.plug-button').prop('disabled', true);
      } else {
        $(this).removeClass('disabled');
        $(this).find('.plug-button').prop('disabled', false);
      }
    });

    // Remove selected plug types that are no longer available
    state.selectedPlugTypes = state.selectedPlugTypes.filter(type => 
      availableTypes.includes(type)
    );
  }

  function updateFilters() {
    // Update continent buttons
    $('.continent-btn').each(function() {
      const continent = $(this).attr('data-continent');
      if (state.selectedContinents.includes(continent)) {
        $(this).addClass('selected');
      } else {
        $(this).removeClass('selected');
      }
    });

    // Update plug type buttons
    $('.plug-btn[data-type]').each(function() {
      const type = $(this).attr('data-type');
      const isSelected = state.selectedPlugTypes.includes(type);
      
      if (isSelected) {
        $(this).addClass('selected');
        $(this).find('.plug-button').addClass('selected');
      } else {
        $(this).removeClass('selected');
        $(this).find('.plug-button').removeClass('selected');
      }
    });

    // Show/hide clear filters button
    if (state.selectedContinents.length > 0 || 
        state.selectedPlugTypes.length > 0 || 
        state.searchQuery.trim()) {
      $('#clearFilters').show();
    } else {
      $('#clearFilters').hide();
    }
  }

  function renderCountries() {
    // Filter data
    let filteredData = adapterData;

    // Filter by continent
    if (state.selectedContinents.length > 0) {
      filteredData = filteredData.filter(item => 
        state.selectedContinents.includes(item.continent)
      );
    }

    // Filter by search
    if (state.searchQuery.trim()) {
      const query = state.searchQuery.toLowerCase();
      filteredData = filteredData.filter(item => 
        item.country.toLowerCase().includes(query)
      );
    }

    // Filter by plug type
    if (state.selectedPlugTypes.length > 0) {
      filteredData = filteredData.filter(item => 
        state.selectedPlugTypes.some(type => item.types.includes(type))
      );
    }

    // Update results count
    const count = filteredData.length;
    $('#resultsCount').text(`${count} ${count === 1 ? 'country' : 'countries'}`);

    // Render countries
    const $list = $('#countryList');
    $list.empty();

    if (filteredData.length === 0) {
      $('#noResults').show();
      return;
    }

    $('#noResults').hide();

    filteredData.forEach(item => {
      const $card = $('<div>').addClass('country-card');
      const $content = $('<div>').addClass('country-card-content');
      
      const $info = $('<div>').addClass('country-info');
      const $header = $('<div>').addClass('country-header');
      $header.html(`
        <img src="https://flagcdn.com/w160/${item.code.toLowerCase()}.png" 
             srcset="https://flagcdn.com/w320/${item.code.toLowerCase()}.png 2x"
             alt="${item.country} flag" class="country-flag">
        <h3 class="country-name">${item.country}</h3>
      `);

      const $details = $('<div>').addClass('country-details');
      $details.html(`
        <span>${item.voltage}</span>
        <span>•</span>
        <span>${item.frequency}</span>
        <span>•</span>
        <span style="font-size: 0.75rem; padding-top: 0.125rem;">${item.continent}</span>
      `);

      $info.append($header).append($details);

      const $plugs = $('<div>').addClass('country-plugs');
      item.types.forEach(type => {
        const $plug = $('<button>')
          .addClass('plug-mini')
          .attr('data-type', type)
          .html(`
            <div class="plug-mini-icon">${getPlugIcon(type)}</div>
            <span class="plug-mini-label">${type}</span>
          `);

        $plug.on('click', function() {
          openModal(type);
        });

        $plugs.append($plug);
      });

      $content.append($info).append($plugs);
      $card.append($content);
      $list.append($card);
    });
  }

  // Travel Page Functions
  function initTravelPage() {
    // Render combobox options
    renderComboboxOptions('#originOptions', adapterData);
    renderComboboxOptions('#destinationOptions', adapterData);

    // Combobox handlers
    setupCombobox('#originCombobox', '#originDropdown', '#originSearch', '#originOptions', '#originValue', (value) => {
      state.originCountry = value;
      updateHeaderSubtitle();
      checkCompatibility();
    });

    setupCombobox('#destinationCombobox', '#destinationDropdown', '#destinationSearch', '#destinationOptions', '#destinationValue', (value) => {
      state.destinationCountry = value;
      updateHeaderSubtitle();
      checkCompatibility();
    });

    // Modal handlers
    $('#modalClose').on('click', function() {
      closeModal();
    });
    
    $('#modalOverlay').on('click', function(e) {
      if (e.target === this) {
        closeModal();
      }
    });

    updateHeaderSubtitle();
  }

  function setupCombobox(inputSelector, dropdownSelector, searchSelector, optionsSelector, valueSelector, onSelect) {
    const $input = $(inputSelector);
    const $dropdown = $(dropdownSelector);
    const $search = $(searchSelector);
    const $options = $(optionsSelector);
    const $value = $(valueSelector);

    let searchQuery = '';

    $input.on('click', function(e) {
      e.stopPropagation();
      $dropdown.toggleClass('active');
      if ($dropdown.hasClass('active')) {
        $search.focus();
      }
    });

    $search.on('input', function() {
      searchQuery = $(this).val().toLowerCase();
      filterOptions($options, searchQuery);
    });

    $search.on('click', function(e) {
      e.stopPropagation();
    });

    $(document).on('click', function(e) {
      if (!$(e.target).closest(inputSelector).length && 
          !$(e.target).closest(dropdownSelector).length) {
        $dropdown.removeClass('active');
        $search.val('');
        searchQuery = '';
        filterOptions($options, '');
      }
    });

    $options.on('click', '.combobox-option', function() {
      const value = $(this).attr('data-value');
      const item = adapterData.find(d => d.country === value);
      
      if (item) {
        $value.html(`
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <img src="https://flagcdn.com/w20/${item.code.toLowerCase()}.png" 
                 alt="${item.country} flag" 
                 class="combobox-option-flag">
            <span>${item.country}</span>
          </div>
        `);
        $dropdown.removeClass('active');
        $search.val('');
        searchQuery = '';
        filterOptions($options, '');
        onSelect(value);
      }
    });
  }

  function renderComboboxOptions(selector, data) {
    const $container = $(selector);
    $container.empty();

    data.forEach(item => {
      const $option = $('<button>')
        .addClass('combobox-option')
        .attr('data-value', item.country)
        .html(`
          <img src="https://flagcdn.com/w20/${item.code.toLowerCase()}.png" 
               alt="${item.country} flag" 
               class="combobox-option-flag">
          <span style="flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis;">${item.country}</span>
        `);

      $container.append($option);
    });
  }

  function filterOptions($container, query) {
    if (!query) {
      $container.find('.combobox-option').show();
      return;
    }

    $container.find('.combobox-option').each(function() {
      const value = $(this).attr('data-value');
      if (value.toLowerCase().includes(query)) {
        $(this).show();
      } else {
        $(this).hide();
      }
    });
  }

  function updateHeaderSubtitle() {
    const $subtitle = $('#headerSubtitle');
    const origin = state.originCountry;
    const destination = state.destinationCountry;

    if (origin && destination) {
      $subtitle.html(`
        Can I go from <span class="badge">${origin}</span> to <span class="badge">${destination}</span> with my plug?
      `);
    } else if (origin) {
      $subtitle.html(`
        Can I go from <span class="badge">${origin}</span> to <span class="badge outline">Y</span> with my plug?
      `);
    } else if (destination) {
      $subtitle.html(`
        Can I go from <span class="badge outline">X</span> to <span class="badge">${destination}</span> with my plug?
      `);
    } else {
      $subtitle.html(`
        Can I go from <span class="badge outline">X</span> to <span class="badge outline">Y</span> with my plug if I am from the following country?
      `);
    }
  }

  function checkCompatibility() {
    if (!state.originCountry || !state.destinationCountry) {
      $('#compatCard').hide();
      $('#instructionsCard').show();
      return;
    }

    $('#instructionsCard').hide();
    $('#compatCard').show();

    const originData = adapterData.find(item => item.country === state.originCountry);
    const destinationData = adapterData.find(item => item.country === state.destinationCountry);

    if (!originData || !destinationData) {
      return;
    }

    const compatibleTypes = originData.types.filter(type => 
      destinationData.types.includes(type)
    );

    const isCompatible = compatibleTypes.length > 0;
    const voltageMatch = originData.voltage === destinationData.voltage;
    const frequencyMatch = originData.frequency === destinationData.frequency;

    // Update header
    if (isCompatible) {
      $('#compatIcon').removeClass('error').addClass('success');
      $('#compatIcon').html(`
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      `);
      $('#compatTitle').text('Yes, your plugs are compatible!');
      $('#compatText').text(
        `You can use your ${compatibleTypes.map(t => `Type ${t}`).join(' and ')} plug${compatibleTypes.length > 1 ? 's' : ''} in ${destinationData.country}.`
      );
    } else {
      $('#compatIcon').removeClass('success').addClass('error');
      $('#compatIcon').html(`
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      `);
      $('#compatTitle').text("No, you'll need an adapter");
      $('#compatText').text(
        `Your plugs from ${originData.country} are not compatible with ${destinationData.country}. You'll need an adapter.`
      );
    }

    // Render compatible types
    if (isCompatible) {
      $('#compatTypes').show();
      const $grid = $('#compatTypesGrid');
      $grid.empty();

      compatibleTypes.forEach(type => {
        const $plug = $('<button>')
          .addClass('compat-plug')
          .attr('data-type', type)
          .html(`
            <div class="compat-plug-icon">${getPlugIcon(type)}</div>
            <span class="compat-plug-label">${type}</span>
          `);

        $plug.on('click', function() {
          openModal(type);
        });

        $grid.append($plug);
      });
    } else {
      $('#compatTypes').hide();
    }

    // Render origin country
    $('#originTitle').text(`From: ${originData.country}`);
    $('#originFlag').attr('src', `https://flagcdn.com/w40/${originData.code.toLowerCase()}.png`);
    $('#originVoltage').text(originData.voltage);
    $('#originFrequency').text(originData.frequency);

    const $originPlugs = $('#originPlugs');
    $originPlugs.empty();
    originData.types.forEach(type => {
      const $plug = $('<button>')
        .addClass('plug-mini')
        .attr('data-type', type)
        .html(`
          <div class="plug-mini-icon">${getPlugIcon(type)}</div>
          <span class="plug-mini-label">${type}</span>
        `);

      $plug.on('click', function() {
        openModal(type);
      });

      $originPlugs.append($plug);
    });

    // Render destination country
    $('#destinationTitle').text(`To: ${destinationData.country}`);
    $('#destinationFlag').attr('src', `https://flagcdn.com/w40/${destinationData.code.toLowerCase()}.png`);
    $('#destinationVoltage').text(destinationData.voltage);
    $('#destinationFrequency').text(destinationData.frequency);

    const $destinationPlugs = $('#destinationPlugs');
    $destinationPlugs.empty();
    destinationData.types.forEach(type => {
      const isCompatible = compatibleTypes.includes(type);
      const $plug = $('<button>')
        .addClass('plug-mini')
        .addClass(isCompatible ? 'compat-plug' : '')
        .attr('data-type', type)
        .html(`
          <div class="plug-mini-icon">${getPlugIcon(type)}</div>
          <span class="plug-mini-label" style="${isCompatible ? 'color: #16a34a;' : ''}">${type}</span>
        `);

      if (isCompatible) {
        $plug.css({
          'border-color': '#22c55e',
          'background': 'rgba(34, 197, 94, 0.1)'
        });
      }

      $plug.on('click', function() {
        openModal(type);
      });

      $destinationPlugs.append($plug);
    });

    // Show warning if voltage/frequency differ
    if (!voltageMatch || !frequencyMatch) {
      $('#compatWarning').show();
      let warningText = '';
      if (!voltageMatch) {
        warningText += `<div>Voltage differs: ${originData.voltage} → ${destinationData.voltage}</div>`;
      }
      if (!frequencyMatch) {
        warningText += `<div>Frequency differs: ${originData.frequency} → ${destinationData.frequency}</div>`;
      }
      warningText += '<div style="margin-top: 0.5rem;">Check if your device supports dual voltage/frequency or use a voltage converter.</div>';
      $('#warningText').html(warningText);
    } else {
      $('#compatWarning').hide();
    }
  }

  // Modal Functions
  function openModal(type) {
    state.modalPlugType = type;
    $('#modalTitle').text(`Type ${type}`);
    $('#modalPlug').html(`
      <div class="modal-plug-icon">${getPlugIcon(type)}</div>
      <span class="modal-plug-label">${type}</span>
    `);
    $('#modalDesc').text(plugDescriptions[type] || '');
    $('#modalOverlay').addClass('active');
  }

  function closeModal() {
    state.modalPlugType = null;
    $('#modalOverlay').removeClass('active');
  }
});
