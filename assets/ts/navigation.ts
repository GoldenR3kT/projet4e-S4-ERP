    var navigationDiv = document.createElement('div');
    navigationDiv.id = 'navigation-div';


    var iframe = document.createElement('iframe');
    iframe.src = '/navigation';
    iframe.width = '18%';
    iframe.height = '101%';
    iframe.style.position = 'fixed';
    iframe.style.zIndex = '1000';
    navigationDiv.appendChild(iframe);

    var erpElement = document.getElementById('erp');

    navigationDiv.classList.add('slide-in');

    erpElement.insertBefore(navigationDiv, erpElement.firstChild);


