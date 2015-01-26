function addCaptionsToImages() {
   wrapImagesInDiv( 'figure', [], [ 'float' ] );
}


if(typeof window.addEventListener != 'undefined') {
   window.addEventListener('load', addCaptionsToImages, false);
}
else if(typeof document.addEventListener != 'undefined') {
   document.addEventListener('load', addCaptionsToImages, false);
}
else if(typeof window.attachEvent != 'undefined') {
   window.attachEvent('onload', addCaptionsToImages);
}

function wrapImagesInDiv( className, attributes, styles ) {
   var images = document.getElementsByClassName(className);
   for ( var i = 0; i < images.length; ++i ) {
      var img = images[i];
      // Lift the image out of the page and insert a div under it.
      var parent = img.parentNode;
      var frame = document.createElement('div');
      var txt = document.createTextNode(img.getAttribute('title'));
      parent.insertBefore(frame, img);
      parent.removeChild(img);
      frame.appendChild(img);
      frame.appendChild(txt);
      // These are special cases.  We always copy these from the image to the
      // div.
      frame.style.width = img.getAttribute('width') + 'px';
      frame.className = img.className;
      // Copy specified attributes and style properties from the image to the
      // div.
      for ( var j = 0; j < attributes.length; ++j ) {
         frame.setAttribute(attributes[j], img.getAttribute(attributes[j]));
      }
      for ( var j = 0; j < styles.length; ++j ) {
         frame.style[styles[j]] = img.style[styles[j]];
      }
   }
}
