javascript:(function() {
  var img = document.createElement('img');
  img.src = 'https://fdc0dcee0a73b9eabfac28247c096e69.cdn.bubble.io/f1726698477001x530415127333733900/MagicEraser_240918_152723.png';
  img.style.position = 'fixed';
  img.style.width = '35px';
  img.style.height = '35px';
  img.style.bottom = '10px';
  img.style.left = '10px';
  img.style.cursor = 'pointer';
  img.style.zIndex = '10000';
  document.body.appendChild(img);

  var group = document.createElement('div');
  group.style.position = 'fixed';
  group.style.top = '100%';
  group.style.left = '0';
  group.style.width = '100%';
  group.style.height = 'calc(100vh - 75px)';
  group.style.backgroundColor = 'black';
  group.style.display = 'none';
  group.style.transition = 'all 0.5s ease';
  group.style.zIndex = '10001';

  var topBar = document.createElement('div');
  topBar.style.position = 'absolute';
  topBar.style.top = '0';
  topBar.style.left = '0';
  topBar.style.width = '100%';
  topBar.style.height = '5px';
  topBar.style.backgroundColor = '#F2D748';
  group.appendChild(topBar);

  var commandList = document.createElement('p');
  commandList.innerText = '1-Custom Code\n2-Find & Replace\n3-Set Input\n4-Convert to bookmarklet\n5-Show alert';
  commandList.style.color = 'white';
  commandList.style.fontSize = '12px';
  commandList.style.position = 'absolute';
  commandList.style.top = '10px';
  commandList.style.left = '0';
  commandList.style.width = '100%';
  commandList.style.textAlign = 'center';
  group.appendChild(commandList);

  // Input field and dropdowns group
  var inputGroup = document.createElement('div');
  inputGroup.style.position = 'absolute';
  inputGroup.style.top = '30%';
  inputGroup.style.left = '0';
  inputGroup.style.width = '100%';
  inputGroup.style.height = 'auto';
  inputGroup.style.display = 'flex';
  inputGroup.style.flexDirection = 'column';
  inputGroup.style.justifyContent = 'center';
  inputGroup.style.alignItems = 'center';
  inputGroup.style.color = 'white';

  // Dropdown for selecting title source
  var titleDropdown = document.createElement('select');
  var titleLabel = document.createElement('label');
  titleLabel.innerText = "Select Title Source: ";
  var titleOptions = ['Local Storage', 'Session Storage', 'Cookies'];
  titleOptions.forEach(function(option) {
    var opt = document.createElement('option');
    opt.value = option;
    opt.textContent = option;
    titleDropdown.appendChild(opt);
  });
  inputGroup.appendChild(titleLabel);
  inputGroup.appendChild(titleDropdown);

  // Dropdown for selecting value source
  var valueDropdown = document.createElement('select');
  var valueLabel = document.createElement('label');
  valueLabel.innerText = "Select Value Source: ";
  var valueOptions = ['Cookies', 'Session Storage', 'Local Storage'];
  valueOptions.forEach(function(option) {
    var opt = document.createElement('option');
    opt.value = option;
    opt.textContent = option;
    valueDropdown.appendChild(opt);
  });
  inputGroup.appendChild(valueLabel);
  inputGroup.appendChild(valueDropdown);

  // Display output area in one line
  var outputArea = document.createElement('p');
  outputArea.style.whiteSpace = 'nowrap'; // Keep output in one line
  outputArea.style.overflow = 'hidden';
  outputArea.style.textOverflow = 'ellipsis'; // Prevent overflow display
  outputArea.style.color = 'yellow';
  inputGroup.appendChild(outputArea);

  // Button to submit and show result
  var submitButton = document.createElement('button');
  submitButton.innerText = 'Display Title | Value';
  submitButton.style.marginTop = '10px';
  inputGroup.appendChild(submitButton);

  group.appendChild(inputGroup);
  document.body.appendChild(group);

  // Function to retrieve data from LocalStorage, SessionStorage, and Cookies
  function getData(source) {
    var data = [];
    if (source === 'Local Storage') {
      for (var i = 0; i < localStorage.length; i++) {
        data.push(`${localStorage.key(i)} | ${localStorage.getItem(localStorage.key(i))}`);
      }
    } else if (source === 'Session Storage') {
      for (var i = 0; i < sessionStorage.length; i++) {
        data.push(`${sessionStorage.key(i)} | ${sessionStorage.getItem(sessionStorage.key(i))}`);
      }
    } else if (source === 'Cookies') {
      document.cookie.split(';').forEach(function(cookie) {
        var parts = cookie.split('=');
        data.push(`${parts[0].trim()} | ${parts[1]}`);
      });
    }
    return data.join(', '); // Join all data in one line
  }

  // Event listener for button
  submitButton.onclick = function() {
    var titleSource = titleDropdown.value;
    var valueSource = valueDropdown.value;
    var titleData = getData(titleSource);
    var valueData = getData(valueSource);

    outputArea.textContent = titleData + ' | ' + valueData;
  };

  img.onclick = function() {
    if (!isDragging) {
      group.style.display = 'block';
      group.style.top = '100%';
      topBar.style.width = '100%';
      setTimeout(function() {
        group.style.top = '0';
      }, 50);
    }
  };

  topBar.onclick = function() {
    group.style.top = '100%';
    setTimeout(function() {
      group.style.display = 'none';
    }, 500);
  };
})();
