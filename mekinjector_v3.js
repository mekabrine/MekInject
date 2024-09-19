javascript:(function(){var img=document.createElement('img');img.src='https://fdc0dcee0a73b9eabfac28247c096e69.cdn.bubble.io/f1726698477001x530415127333733900/MagicEraser_240918_152723.png';img.style.position='fixed';img.style.width='35px';img.style.height='35px';img.style.bottom='10px';img.style.left='10px';img.style.cursor='pointer';img.style.zIndex='10000';document.body.appendChild(img);var group=document.createElement('div');group.style.position='fixed';group.style.top='100%';group.style.left='0';group.style.width='100%';group.style.height='calc(100vh - 75px)';group.style.backgroundColor='black';group.style.display='none';group.style.transition='all 0.5s ease';group.style.zIndex='10001';var topBar=document.createElement('div');topBar.style.position='absolute';topBar.style.top='0';topBar.style.left='0';topBar.style.width='100%';topBar.style.height='5px';topBar.style.backgroundColor='#F2D748';group.appendChild(topBar);var commandList=document.createElement('p');commandList.innerText='1-Custom Code\n2-Find & Replace\n3-Set Input\n4-Convert to bookmarklet\n5-Show alert';commandList.style.color='white';commandList.style.fontSize='12px';commandList.style.position='absolute';commandList.style.top='10px';commandList.style.left='0';commandList.style.width='100%';commandList.style.textAlign='center';group.appendChild(commandList);var inputGroup=document.createElement('div');inputGroup.style.position='absolute';inputGroup.style.top='30%';inputGroup.style.left='0';inputGroup.style.width='100%';inputGroup.style.height='60px';inputGroup.style.display='flex';inputGroup.style.flexDirection='column';inputGroup.style.justifyContent='center';inputGroup.style.alignItems='center';inputGroup.style.color='white';var promptText=document.createElement('p');promptText.innerText='Enter your command number:';inputGroup.appendChild(promptText);var inputField=document.createElement('input');inputField.type='text';inputField.placeholder='Type 1, 2, 3, 4, or 5...';inputField.style.width='80%';inputField.style.padding='5px';inputGroup.appendChild(inputField);var submitButton=document.createElement('button');submitButton.innerText='Submit';submitButton.style.marginTop='10px';inputGroup.appendChild(submitButton);group.appendChild(inputGroup);document.body.appendChild(group);var offsetX,offsetY,isDragging=false,clicked=false,touchEndFired=false;function glideToEdge(){var imgRect=img.getBoundingClientRect(),windowWidth=window.innerWidth,windowHeight=window.innerHeight,leftDist=imgRect.left,rightDist=windowWidth-imgRect.right,topDist=imgRect.top,bottomDist=windowHeight-imgRect.bottom;if(leftDist<rightDist&&leftDist<=topDist&&leftDist<=bottomDist){img.style.transition='left 0.5s';img.style.left='0px';}else if(rightDist<=leftDist&&rightDist<=topDist&&rightDist<=bottomDist){img.style.transition='left 0.5s';img.style.left=(windowWidth-imgRect.width)+'px';}else if(topDist<=bottomDist&&topDist<=leftDist&&topDist<=rightDist){img.style.transition='top 0.5s';img.style.top='0px';}else if(bottomDist<=topDist&&bottomDist<=leftDist&&bottomDist<=rightDist){img.style.transition='top 0.5s';img.style.top=(windowHeight-imgRect.height)+'px';}}img.addEventListener('touchstart',function(e){offsetX=e.touches[0].clientX-img.getBoundingClientRect().left;offsetY=e.touches[0].clientY-img.getBoundingClientRect().top;isDragging=false;clicked=true;touchEndFired=false;setTimeout(function(){clicked=false;},200);e.preventDefault();});img.addEventListener('touchmove',function(e){if(clicked){isDragging=true;}if(isDragging){img.style.left=(e.touches[0].clientX-offsetX)+'px';img.style.top=(e.touches[0].clientY-offsetY)+'px';}});img.addEventListener('touchend',function(){if(isDragging){glideToEdge();}else if(!touchEndFired){img.click();}isDragging=false;clicked=false;touchEndFired=true;});img.onmousedown=function(e){offsetX=e.clientX-img.getBoundingClientRect().left;offsetY=e.clientY-img.getBoundingClientRect().top;isDragging=false;clicked=true;document.onmousemove=function(e){if(clicked){isDragging=true;}if(isDragging){img.style.left=(e.clientX-offsetX)+'px';img.style.top=(e.clientY-offsetY)+'px';}};document.onmouseup=function(){if(isDragging){glideToEdge();}isDragging=false;clicked=false;document.onmousemove=null;document.onmouseup=null;};};img.onclick=function(){if(!isDragging){group.style.display='block';group.style.top='calc(100vh - 75px)';topBar.style.width='100%';group.style.top='0';}};topBar.onclick=function(){group.style.top='100%';setTimeout(function(){group.style.display='none';},500);};submitButton.onclick=function(){var command=inputField.value.trim();if(command){switch(command){case'1':var code=prompt('Enter JavaScript code:');if(code){try{eval(code);}catch(err){console.error(err);}}break;case'2':var findText=prompt('Text to find:'),replaceText=prompt('Replace that with:');if(findText&&replaceText){document.querySelectorAll('*').forEach(function(n){if(n.childNodes.length===1&&n.childNodes[0].nodeType===3){n.textContent=n.textContent.replace(new RegExp(findText,'g'),replaceText);}});console.log('Replaced all occurrences of "'+findText+'" with "'+replaceText+'".');}break;case'3':let findMethod=prompt('1-Find from placeholder\n2-Find from value');if(findMethod==='1'||findMethod==='2'){const inputs=document.querySelectorAll('input');let targetInput=null;if(findMethod==='1'){let placeholderValue=prompt('Please enter the placeholder for the input field:');inputs.forEach(input=>{if(input.placeholder===placeholderValue){targetInput=input;}});}else if(findMethod==='2'){let currentValue=prompt('Please enter the current value of the input field:');inputs.forEach(input=>{if(input.value===currentValue){targetInput=input;}});}if(targetInput){let inputValue=prompt('Please enter the new value for the input field:');targetInput.value=inputValue;}else{alert('No input field found with the specified criteria.');}}else{alert('Invalid selection. Please choose 1 or 2.');}break;case'4':var userCode=prompt('Enter the JavaScript code to format as a bookmarklet:');if(userCode){var bookmarkletCode='javascript:(function(){'+encodeURIComponent(userCode.replace(/\s+/g,' '))+'})();';console.log('Formatted Bookmarklet Code:',bookmarkletCode);let currentValue=prompt('Enter the current value of the input field to find:');const inputs=document.querySelectorAll('input');let targetInput=null;inputs.forEach(input=>{if(input.value===currentValue){targetInput=input;}});if(targetInput){targetInput.value=bookmarkletCode;alert('Input\'s value set to the bookmarklet code!');}else{alert('No input field found with the specified value.');}}else{alert('No code provided.');}break;case'5':var alertMessage=prompt('Enter the alert message:');if(alertMessage){alert(alertMessage);}break;default:alert('Invalid command number.');}}};})();