  const iconsContainer = document.querySelector(".icons");
  const snapPreview = document.getElementById("snap-preview");
  const contextMenu = document.querySelector(".context-menu");
  const desktop = document.querySelector(".main");


  desktop.addEventListener('click' , function(){
    contextMenu.style.display = "none";
        pannel.style.display = 'none'
  })



  //Mouse Clicks Events
  function mouseClicksEvents() {
    desktop.addEventListener("mousedown", function (e) {
      if (e.button === 0) {
        // contextMenu.style.display = "none";
        // pannel.style.display = 'none'

      } else if (e.button === 1) {
        console.log("Middle button clicked");
        // contextMenu.style.display = "none";
      } else if (e.button === 2) {
        console.log("Right button clicked");
        e.preventDefault();
        contextMenu.style.display = "block";
        contextMenu.style.left = e.pageX + "px";
        contextMenu.style.top = e.pageY + "px";
      }
    });
  }
  mouseClicksEvents();

  //context menu ek ander ke button ka work..

  //PAGE REFRESH

  function refresh() {
    const refresh = document.getElementById("refresh");

    refresh.addEventListener("click", () => {
      location.reload();
      contextMenu.style.display = "none";
    });
  }
  refresh();

  function NEwFolderKeAnderKaKaamJham(){
    
  function snapToGrid(x, y, gridSize = 40) {
    const snappedX = Math.round(x / gridSize) * gridSize;
    const snappedY = Math.round(y / gridSize) * gridSize;
    return { x: snappedX, y: snappedY };
  }



    function loadPosition() {
    const icons = document.querySelectorAll(".icon");
    icons.forEach((elem) => {
      const id = elem.id;
      const savedPos = JSON.parse(localStorage.getItem(id));
      if (savedPos) {
        elem.style.left = savedPos.x + "px";
        elem.style.top = savedPos.y + "px";
      }
    });
  }

  function makeDraggable(drag) {
    let isDragging = false;
    let shiftX, shiftY;

    drag.onmousedown = (e) => {
      isDragging = true;

      shiftX = e.clientX - drag.getBoundingClientRect().left;
      shiftY = e.clientY - drag.getBoundingClientRect().top;

      function onMouseMove(e) {
        if (!isDragging) return;
      const snapped = snapToGrid(e.pageX - shiftX, e.pageY - shiftY);
  drag.style.left = snapped.x + "px";
  drag.style.top = snapped.y + "px";

    snapPreview.style.left = snapped.x + "px";
    snapPreview.style.top = snapped.y + "px";
    snapPreview.style.display = "block";

      }

      function onMouseUp() {
        isDragging = false;
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);

        snapPreview.style.display = "none";


        // ✅ Save position of the specific dragged icon
        const id = drag.id;
        localStorage.setItem(id, JSON.stringify({
          x: drag.offsetLeft,
          y: drag.offsetTop
          
        }));
        console.log(`Saved ${drag.id}: (${drag.offsetLeft}, ${drag.offsetTop})`);
      }

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    };

    drag.ondragstart = () => false;
  }

  //  Apply on existing icons
  document.querySelectorAll(".icon").forEach(makeDraggable);

  // ⏫Load positions on start
  loadDynamicIcons()
  loadPosition();

  //  Add new icon dynamically
  let iconCount = document.querySelectorAll(".icon").length + 1;

  document.getElementById("new-folder").onclick = () => {
    const newIcon = document.createElement("div");
    newIcon.className = "icon";
    newIcon.id = iconCount++;
    newIcon.innerHTML = `
      <img src="https://img.icons8.com/fluency/48/folder-invoices.png" />
      <p>New</p>
    `;
    newIcon.style.left = "20px";
    newIcon.style.top = "20px";

    iconsContainer.appendChild(newIcon);
    makeDraggable(newIcon);

    // Save new icon ID to localStorage
  let allIcons = JSON.parse(localStorage.getItem("dynamic-icons")) || [];
  allIcons.push(newIcon.id);
  localStorage.setItem("dynamic-icons", JSON.stringify(allIcons));

  };

  function loadDynamicIcons() {
    const stored = JSON.parse(localStorage.getItem("dynamic-icons")) || [];

    stored.forEach((id) => {
      const icon = document.createElement("div");
      icon.className = "icon";
      icon.id = id;
      icon.innerHTML = `
        <img src="https://img.icons8.com/fluency/48/folder-invoices.png" />
        <p>New</p>
      `;
      icon.style.left = "20px";
      icon.style.top = "20px";
      iconsContainer.appendChild(icon);
      makeDraggable(icon);
    });
  }

  

  }
  NEwFolderKeAnderKaKaamJham()


  function searchBrowserFunction(){
    const searchBox = document.getElementById('searchInput')


  function searchNow(){
    const text = searchBox.value.trim();
    
    if(text !== ""){
      const finalLink = "https://www.google.com/search?q=" + encodeURIComponent(text);

      window.open(finalLink,"_blank")
    }
  }

  searchBox.addEventListener('keypress' , (e) => {
    if (e.key === "Enter") {
      searchNow();  // same function call
    }
    })

    const searchBtn = document.querySelector('#searchBtn')
    
    searchBtn.addEventListener('click' , function () {
      searchNow();
    })
    

    const browser = document.querySelector('.browserFunction');

    const minimize = document.querySelector('.minimize');
    const maximize = document.querySelector('.maximize');
    const close = document.querySelector('.close');
      const content = browser.querySelector('.content');
    console.log(minimize);
    
    // Minimize: just hide content area
  minimize.addEventListener('click', () => {
    browser.style.display = 'none';

    
  });

  // Maximize: toggle full screen
  let isMaximized = false;
  maximize.addEventListener('click', () => {
    if (!isMaximized) {
      browser.style.width = '100%';
      browser.style.height = '100%';
      browser.style.left = '0';
      browser.style.top = '0';
      browser.style.transform = 'none';
      isMaximized = true;
    } else {
      browser.style.width = '75%';
      browser.style.height = '70%';
      browser.style.left = '50%';
      browser.style.top = '50%';
      browser.style.transform = 'translate(-50%, -50%)';
      isMaximized = false;
    }
  });

  // Close: hide the whole browser window
  close.addEventListener('click', () => {
    browser.style.display = 'none';
  });

  const iconGoogle = document.querySelector('#icon-google')

  iconGoogle.addEventListener('dblclick' , ()=>{
    browser.style.display = "block"
  })

  }
  searchBrowserFunction()

  function thisPCFunction(){

    const thisPcWindow  = document.querySelector('.this-pc-window');

    const minimize1 = document.querySelector('.minimize1');
    const maximize1 = document.querySelector('.maximize1');
    const close1 = document.querySelector('.close1');
    
    // Minimize: just hide content area
  minimize1.addEventListener('click', () => {
    thisPcWindow.style.display = 'none';

    
  });

  // Maximize: toggle full screen
  let isMaximized = false;
  maximize1.addEventListener('click', () => {
    if (!isMaximized) {
      thisPcWindow.style.height = '99vh';
      thisPcWindow.style.width = '100%';
      thisPcWindow.style.left = '0';
      thisPcWindow.style.top = '0';
      thisPcWindow.style.transform = 'none';
      isMaximized = true;
    } else {
      thisPcWindow.style.width = '70%';
      thisPcWindow.style.height = '250px';
      thisPcWindow.style.left = '50%';
      thisPcWindow.style.top = '50%';
      thisPcWindow.style.transform = 'translate(-50%, -50%)';
      isMaximized = false;
    }
  });

  // Close: hide the whole browser window
  close1.addEventListener('click', () => {
    thisPcWindow.style.display = 'none';
    
  });

  const iconThisPc = document.querySelector('#icon-this-pc')

  iconThisPc.addEventListener('dblclick' , ()=>{
    thisPcWindow.style.display = "block"
  })


  }
  const documents = document.getElementById('documents')
  const documentsInner = document.getElementById('document-inner')
  const forward = document.querySelectorAll('#forward')
  const backward = document.querySelectorAll('#backward')
  const musicInner = document.getElementById('music-inner')
  const videosInner = document.getElementById('videos-inner')


  console.log(documents);

documents.addEventListener('click',() => {
  documentsInner.style.display = "block"
})
  

  backward.forEach((elem) => {
    elem.addEventListener('click',() => {
      documentsInner.style.display = "none"
      picturesInner.style.display = "none"
      musicInner.style.display = "none"
      videosInner.style.display = "none"
  })
  })

  const pictures = document.getElementById('pictures')

  const picturesInner = document.getElementById('pictures-inner')


  pictures.addEventListener('click',() => {
    picturesInner.style.display = "block"
  })

  
  const music = document.getElementById('music')


  music.addEventListener('click',() => {
    musicInner.style.display = "block"
  })

  const videos = document.getElementById('videos')

  
  videos.addEventListener('click',() => {
   videosInner.style.display = "block"
  })


  thisPCFunction()




 const iconPictures = document.querySelector('#icon-pictures')
 const images = document.querySelector('#images')


 const thisPcWindow  = document.querySelector('.this-pc-window');

function imagesFolderWork(){
  const minimize2 = document.querySelector('.minimize2');
  const maximize2= document.querySelector('.maximize2');
  const close2 = document.querySelector('.close2');
  
  // Minimize: just hide content area
minimize2.addEventListener('click', () => {
  images.style.display = 'none';

  
});

// Maximize: toggle full screen
let isMaximized = false;
maximize2.addEventListener('click', () => {
  if (!isMaximized) {
    images.style.height = '99vh';
    images.style.width = '100%';
    images.style.left = '0';
    images.style.top = '0';
    images.style.transform = 'none';
    isMaximized = true;
  } else {
    images.style.width = '250px';
    images.style.height = '70%';
    images.style.left = '50%';
    images.style.top = '50%';
    images.style.transform = 'translate(-50%, -50%)';
    isMaximized = false;
  }
});

// Close: hide the whole browser window
close2.addEventListener('click', () => {
  images.style.display = 'none';
  
});




console.log(iconPictures);

iconPictures.addEventListener('dblclick' , ()=>{
images.style.display = "block"
})
}

imagesFolderWork()
 
function videosFolderWork(){
  
//  const thisPcWindow  = document.querySelector('.this-pc-window');

const minimize3 = document.querySelector('.minimize3');
const maximize3= document.querySelector('.maximize3');
const close3 = document.querySelector('.close3');
const videosFolder = document.querySelector('#videosFolder')


  // Minimize: just hide content area
minimize3.addEventListener('click', () => {
videosFolder.style.display = 'none';


});

// Maximize: toggle full screen
let isMaximized = false;
maximize3.addEventListener('click', () => {
if (!isMaximized) {
  videosFolder.style.height = '99vh';
  videosFolder.style.width = '100%';
  videosFolder.style.left = '0';
  videosFolder.style.top = '0';
  videosFolder.style.transform = 'none';
  isMaximized = true;
} else {
  videosFolder.style.width = '250px';
  videosFolder.style.height = '70%';
  videosFolder.style.left = '50%';
  videosFolder.style.top = '50%';
  videosFolder.style.transform = 'translate(-50%, -50%)';
  isMaximized = false;
}
});

// Close: hide the whole browser window
close3.addEventListener('click', () => {
  videosFolder.style.display = 'none';
  
});

const iconVideos = document.getElementById('icon-videos')

iconVideos.addEventListener('dblclick' , function(){
  videosFolder.style.display = 'block';

})


}

videosFolderWork()


function personalize(){
  
const personalize = document.querySelector('#personalize');
const body = document.querySelector('body');

const backgrounds = [
  // "url('https://images.unsplash.com/photo-1566679056462-2075774c8c07?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=1080&w=1920')",  // ocean wave
  "url('https://images.unsplash.com/photo-1503264116251-35a269479413?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=1080&w=1920')",  // forest sunset
  "url('https://images.unsplash.com/photo-1510070009289-b5bc34383727?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=1080&w=1920')",  // abstract blue
  "url('https://images.unsplash.com/photo-1526401485004-2d274b1a70f1?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=1080&w=1920')",  // clouds & mountains
  "url('https://images.unsplash.com/photo-1518779578993-ec3579fee39f?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=1080&w=1920')",  // clean minimal desk
  "url('https://images.unsplash.com/photo-1602524204747-1111b3722f60?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=1080&w=1920')",  // glass texture
  "url('https://images.unsplash.com/photo-1549887534-3ec93abae4f3?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=1080&w=1920')",  // gradient blue-purple
  "url('https://images.unsplash.com/photo-1606787366850-de6330128bfc?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=1080&w=1920')",  // misty mountains
  "url('https://images.unsplash.com/photo-1549921296-3a6b5d1c7f38?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=1080&w=1920')",  // sunrise sky
  "url('https://images.unsplash.com/photo-1519183071298-a2962ae0b2ac?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=1080&w=1920')",  // tech surface
  "url('https://images.unsplash.com/photo-1498050108023-c5249f4df085?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=1080&w=1920')"   // workspace flat lay
];

let bgIndex = 0;
const savedBg = localStorage.getItem("wallpaper");
if (savedBg) {
  body.style.backgroundImage = savedBg;
  body.style.backgroundSize = "cover";
  body.style.backgroundRepeat = "no-repeat";
  body.style.backgroundPosition = "center";
}

personalize.addEventListener('click', () => {
  const selectedBg = backgrounds[bgIndex];
  body.style.backgroundImage = selectedBg;
  body.style.backgroundSize = "cover";
  body.style.backgroundRepeat = "no-repeat";
  body.style.backgroundPosition = "center";

  // ✅ Save to localStorage
  localStorage.setItem("wallpaper", selectedBg);

  bgIndex = (bgIndex + 1) % backgrounds.length;
});
}

personalize();

const right = document.querySelector('.right')
const pannel = document.querySelector('.pannel')

right.addEventListener('click' , function(){
  pannel.style.display = 'block'
})

const slider = document.getElementById("brightnessSlider");
const overlay = document.querySelector(".brightness-overlay");

slider.addEventListener("input", () => {
  let value = 1 - slider.value; // 1 => 0, 0.5 => 0.5
  overlay.style.opacity = value;
});


const iconInsta = document.getElementById('icon-instagram');

iconInsta.addEventListener('dblclick', () => {
  window.open("https://www.instagram.com", "_blank");
});
iconInsta.addEventListener('click', () => {
  window.open("https://www.instagram.com", "_blank");
});


const iconGithub = document.getElementById("icon-github");

iconGithub.addEventListener("dblclick", () => {
  window.open("https://github.com", "_blank");
});
