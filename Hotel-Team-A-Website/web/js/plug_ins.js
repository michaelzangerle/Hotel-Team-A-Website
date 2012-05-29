/* ------------------------------------------------------------------------
	Class: prettyPhoto
	Use: Lightbox clone for jQuery
	Author: Stephane Caron (http://www.no-margin-for-errors.com)
	Version: 3.1.3
------------------------------------------------------------------------- */

(function($){$.prettyPhoto={version:'3.1.3'};$.fn.prettyPhoto=function(pp_settings){pp_settings=jQuery.extend({animation_speed:'fast',slideshow:5000,autoplay_slideshow:false,opacity:0.80,show_title:true,allow_resize:true,default_width:500,default_height:344,counter_separator_label:'/',theme:'pp_default',horizontal_padding:20,hideflash:false,wmode:'opaque',autoplay:true,modal:false,deeplinking:true,overlay_gallery:true,keyboard_shortcuts:true,changepicturecallback:function(){},callback:function(){},ie6_fallback:true,markup:'<div class="pp_pic_holder"> \
      <div class="ppt">&nbsp;</div> \
      <div class="pp_top"> \
       <div class="pp_left"></div> \
       <div class="pp_middle"></div> \
       <div class="pp_right"></div> \
      </div> \
      <div class="pp_content_container"> \
       <div class="pp_left"> \
       <div class="pp_right"> \
        <div class="pp_content"> \
         <div class="pp_loaderIcon"></div> \
         <div class="pp_fade"> \
          <a href="#" class="pp_expand" title="Expand the image">Expand</a> \
          <div class="pp_hoverContainer"> \
           <a class="pp_next" href="#">next</a> \
           <a class="pp_previous" href="#">previous</a> \
          </div> \
          <div id="pp_full_res"></div> \
          <div class="pp_details"> \
           <div class="pp_nav"> \
            <a href="#" class="pp_arrow_previous">Previous</a> \
            <p class="currentTextHolder">0/0</p> \
            <a href="#" class="pp_arrow_next">Next</a> \
           </div> \
           <p class="pp_description"></p> \
           <div class="pp_social">{pp_social}</div> \
           <a class="pp_close" href="#">Close</a> \
          </div> \
         </div> \
        </div> \
       </div> \
       </div> \
      </div> \
      <div class="pp_bottom"> \
       <div class="pp_left"></div> \
       <div class="pp_middle"></div> \
       <div class="pp_right"></div> \
      </div> \
     </div> \
     <div class="pp_overlay"></div>',gallery_markup:'<div class="pp_gallery"> \
        <a href="#" class="pp_arrow_previous">Previous</a> \
        <div> \
         <ul> \
          {gallery} \
         </ul> \
        </div> \
        <a href="#" class="pp_arrow_next">Next</a> \
       </div>',image_markup:'<img id="fullResImage" src="{path}" />',flash_markup:'<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="{width}" height="{height}"><param name="wmode" value="{wmode}" /><param name="allowfullscreen" value="true" /><param name="allowscriptaccess" value="always" /><param name="movie" value="{path}" /><embed src="{path}" type="application/x-shockwave-flash" allowfullscreen="true" allowscriptaccess="always" width="{width}" height="{height}" wmode="{wmode}"></embed></object>',quicktime_markup:'<object classid="clsid:02BF25D5-8C17-4B23-BC80-D3488ABDDC6B" codebase="http://www.apple.com/qtactivex/qtplugin.cab" height="{height}" width="{width}"><param name="src" value="{path}"><param name="autoplay" value="{autoplay}"><param name="type" value="video/quicktime"><embed src="{path}" height="{height}" width="{width}" autoplay="{autoplay}" type="video/quicktime" pluginspage="http://www.apple.com/quicktime/download/"></embed></object>',iframe_markup:'<iframe src ="{path}" width="{width}" height="{height}" frameborder="no"></iframe>',inline_markup:'<div class="pp_inline">{content}</div>',custom_markup:'',social_tools:'<div class="twitter"><a href="http://twitter.com/share" class="twitter-share-button" data-count="none">Tweet</a><script type="text/javascript" src="http://platform.twitter.com/widgets.js"></script></div><div class="facebook"><iframe src="http://www.facebook.com/plugins/like.php?locale=en_US&href={location_href}&amp;layout=button_count&amp;show_faces=true&amp;width=500&amp;action=like&amp;font&amp;colorscheme=light&amp;height=23" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:500px; height:23px;" allowTransparency="true"></iframe></div>'},pp_settings);var matchedObjects=this,percentBased=false,pp_dimensions,pp_open,pp_contentHeight,pp_contentWidth,pp_containerHeight,pp_containerWidth,windowHeight=$(window).height(),windowWidth=$(window).width(),pp_slideshow;doresize=true,scroll_pos=_get_scroll();$(window).unbind('resize.prettyphoto').bind('resize.prettyphoto',function(){_center_overlay();_resize_overlay();});if(pp_settings.keyboard_shortcuts){$(document).unbind('keydown.prettyphoto').bind('keydown.prettyphoto',function(e){if(typeof $pp_pic_holder!='undefined'){if($pp_pic_holder.is(':visible')){switch(e.keyCode){case 37:$.prettyPhoto.changePage('previous');e.preventDefault();break;case 39:$.prettyPhoto.changePage('next');e.preventDefault();break;case 27:if(!settings.modal)
$.prettyPhoto.close();e.preventDefault();break;};};};});};$.prettyPhoto.initialize=function(){settings=pp_settings;if(settings.theme=='pp_default')settings.horizontal_padding=16;if(settings.ie6_fallback&&$.browser.msie&&parseInt($.browser.version)==6)settings.theme="light_square";theRel=$(this).attr('data-rel');galleryRegExp=/\[(?:.*)\]/;isSet=(galleryRegExp.exec(theRel))?true:false;pp_images=(isSet)?jQuery.map(matchedObjects,function(n,i){if($(n).attr('data-rel').indexOf(theRel)!=-1)return $(n).attr('href');}):$.makeArray($(this).attr('href'));pp_titles=(isSet)?jQuery.map(matchedObjects,function(n,i){if($(n).attr('data-rel').indexOf(theRel)!=-1)return($(n).find('img').attr('alt'))?$(n).find('img').attr('alt'):"";}):$.makeArray($(this).find('img').attr('alt'));pp_descriptions=(isSet)?jQuery.map(matchedObjects,function(n,i){if($(n).attr('data-rel').indexOf(theRel)!=-1)return($(n).attr('title'))?$(n).attr('title'):"";}):$.makeArray($(this).attr('title'));if(pp_images.length>30)settings.overlay_gallery=false;set_position=jQuery.inArray($(this).attr('href'),pp_images);rel_index=(isSet)?set_position:$("a[rel^='"+theRel+"']").index($(this));_build_overlay(this);if(settings.allow_resize)
$(window).bind('scroll.prettyphoto',function(){_center_overlay();});$.prettyPhoto.open();return false;}
$.prettyPhoto.open=function(event){if(typeof settings=="undefined"){settings=pp_settings;if($.browser.msie&&$.browser.version==6)settings.theme="light_square";pp_images=$.makeArray(arguments[0]);pp_titles=(arguments[1])?$.makeArray(arguments[1]):$.makeArray("");pp_descriptions=(arguments[2])?$.makeArray(arguments[2]):$.makeArray("");isSet=(pp_images.length>1)?true:false;set_position=0;_build_overlay(event.target);}
if($.browser.msie&&$.browser.version==6)$('select').css('visibility','hidden');if(settings.hideflash)$('object,embed,iframe[src*=youtube],iframe[src*=vimeo]').css('visibility','hidden');_checkPosition($(pp_images).size());$('.pp_loaderIcon').show();if(settings.deeplinking)
setHashtag();if(settings.social_tools){facebook_like_link=settings.social_tools.replace('{location_href}',encodeURIComponent(location.href));$pp_pic_holder.find('.pp_social').html(facebook_like_link);}
if($ppt.is(':hidden'))$ppt.css('opacity',0).show();$pp_overlay.show().fadeTo(settings.animation_speed,settings.opacity);$pp_pic_holder.find('.currentTextHolder').text((set_position+1)+settings.counter_separator_label+$(pp_images).size());if(pp_descriptions[set_position]!=""){$pp_pic_holder.find('.pp_description').show().html(unescape(pp_descriptions[set_position]));}else{$pp_pic_holder.find('.pp_description').hide();}
movie_width=(parseFloat(getParam('width',pp_images[set_position])))?getParam('width',pp_images[set_position]):settings.default_width.toString();movie_height=(parseFloat(getParam('height',pp_images[set_position])))?getParam('height',pp_images[set_position]):settings.default_height.toString();percentBased=false;if(movie_height.indexOf('%')!=-1){movie_height=parseFloat(($(window).height()*parseFloat(movie_height)/100)-150);percentBased=true;}
if(movie_width.indexOf('%')!=-1){movie_width=parseFloat(($(window).width()*parseFloat(movie_width)/100)-150);percentBased=true;}
$pp_pic_holder.fadeIn(function(){(settings.show_title&&pp_titles[set_position]!=""&&typeof pp_titles[set_position]!="undefined")?$ppt.html(unescape(pp_titles[set_position])):$ppt.html('&nbsp;');imgPreloader="";skipInjection=false;switch(_getFileType(pp_images[set_position])){case'image':imgPreloader=new Image();nextImage=new Image();if(isSet&&set_position<$(pp_images).size()-1)nextImage.src=pp_images[set_position+1];prevImage=new Image();if(isSet&&pp_images[set_position-1])prevImage.src=pp_images[set_position-1];$pp_pic_holder.find('#pp_full_res')[0].innerHTML=settings.image_markup.replace(/{path}/g,pp_images[set_position]);imgPreloader.onload=function(){pp_dimensions=_fitToViewport(imgPreloader.width,imgPreloader.height);_showContent();};imgPreloader.onerror=function(){alert('Image cannot be loaded. Make sure the path is correct and image exist.');$.prettyPhoto.close();};imgPreloader.src=pp_images[set_position];break;case'youtube':pp_dimensions=_fitToViewport(movie_width,movie_height);movie_id=getParam('v',pp_images[set_position]);if(movie_id==""){movie_id=pp_images[set_position].split('youtu.be/');movie_id=movie_id[1];if(movie_id.indexOf('?')>0)
movie_id=movie_id.substr(0,movie_id.indexOf('?'));if(movie_id.indexOf('&')>0)
movie_id=movie_id.substr(0,movie_id.indexOf('&'));}
movie='http://www.youtube.com/embed/'+movie_id;(getParam('rel',pp_images[set_position]))?movie+="?rel="+getParam('rel',pp_images[set_position]):movie+="?rel=1";if(settings.autoplay)movie+="&autoplay=1";toInject=settings.iframe_markup.replace(/{width}/g,pp_dimensions['width']).replace(/{height}/g,pp_dimensions['height']).replace(/{wmode}/g,settings.wmode).replace(/{path}/g,movie);break;case'vimeo':pp_dimensions=_fitToViewport(movie_width,movie_height);movie_id=pp_images[set_position];var regExp=/http:\/\/(www\.)?vimeo.com\/(\d+)/;var match=movie_id.match(regExp);movie='http://player.vimeo.com/video/'+match[2]+'?title=0&amp;byline=0&amp;portrait=0';if(settings.autoplay)movie+="&autoplay=1;";vimeo_width=pp_dimensions['width']+'/embed/?moog_width='+pp_dimensions['width'];toInject=settings.iframe_markup.replace(/{width}/g,vimeo_width).replace(/{height}/g,pp_dimensions['height']).replace(/{path}/g,movie);break;case'quicktime':pp_dimensions=_fitToViewport(movie_width,movie_height);pp_dimensions['height']+=15;pp_dimensions['contentHeight']+=15;pp_dimensions['containerHeight']+=15;toInject=settings.quicktime_markup.replace(/{width}/g,pp_dimensions['width']).replace(/{height}/g,pp_dimensions['height']).replace(/{wmode}/g,settings.wmode).replace(/{path}/g,pp_images[set_position]).replace(/{autoplay}/g,settings.autoplay);break;case'flash':pp_dimensions=_fitToViewport(movie_width,movie_height);flash_vars=pp_images[set_position];flash_vars=flash_vars.substring(pp_images[set_position].indexOf('flashvars')+10,pp_images[set_position].length);filename=pp_images[set_position];filename=filename.substring(0,filename.indexOf('?'));toInject=settings.flash_markup.replace(/{width}/g,pp_dimensions['width']).replace(/{height}/g,pp_dimensions['height']).replace(/{wmode}/g,settings.wmode).replace(/{path}/g,filename+'?'+flash_vars);break;case'iframe':pp_dimensions=_fitToViewport(movie_width,movie_height);frame_url=pp_images[set_position];frame_url=frame_url.substr(0,frame_url.indexOf('iframe')-1);toInject=settings.iframe_markup.replace(/{width}/g,pp_dimensions['width']).replace(/{height}/g,pp_dimensions['height']).replace(/{path}/g,frame_url);break;case'ajax':doresize=false;pp_dimensions=_fitToViewport(movie_width,movie_height);doresize=true;skipInjection=true;$.get(pp_images[set_position],function(responseHTML){toInject=settings.inline_markup.replace(/{content}/g,responseHTML);$pp_pic_holder.find('#pp_full_res')[0].innerHTML=toInject;_showContent();});break;case'custom':pp_dimensions=_fitToViewport(movie_width,movie_height);toInject=settings.custom_markup;break;case'inline':myClone=$(pp_images[set_position]).clone().append('<br clear="all" />').css({'width':settings.default_width}).wrapInner('<div id="pp_full_res"><div class="pp_inline"></div></div>').appendTo($('body')).show();doresize=false;pp_dimensions=_fitToViewport($(myClone).width(),$(myClone).height());doresize=true;$(myClone).remove();toInject=settings.inline_markup.replace(/{content}/g,$(pp_images[set_position]).html());break;};if(!imgPreloader&&!skipInjection){$pp_pic_holder.find('#pp_full_res')[0].innerHTML=toInject;_showContent();};});return false;};$.prettyPhoto.changePage=function(direction){currentGalleryPage=0;if(direction=='previous'){set_position--;if(set_position<0)set_position=$(pp_images).size()-1;}else if(direction=='next'){set_position++;if(set_position>$(pp_images).size()-1)set_position=0;}else{set_position=direction;};rel_index=set_position;if(!doresize)doresize=true;$('.pp_contract').removeClass('pp_contract').addClass('pp_expand');_hideContent(function(){$.prettyPhoto.open();});};$.prettyPhoto.changeGalleryPage=function(direction){if(direction=='next'){currentGalleryPage++;if(currentGalleryPage>totalPage)currentGalleryPage=0;}else if(direction=='previous'){currentGalleryPage--;if(currentGalleryPage<0)currentGalleryPage=totalPage;}else{currentGalleryPage=direction;};slide_speed=(direction=='next'||direction=='previous')?settings.animation_speed:0;slide_to=currentGalleryPage*(itemsPerPage*itemWidth);$pp_gallery.find('ul').animate({left:-slide_to},slide_speed);};$.prettyPhoto.startSlideshow=function(){if(typeof pp_slideshow=='undefined'){$pp_pic_holder.find('.pp_play').unbind('click').removeClass('pp_play').addClass('pp_pause').click(function(){$.prettyPhoto.stopSlideshow();return false;});pp_slideshow=setInterval($.prettyPhoto.startSlideshow,settings.slideshow);}else{$.prettyPhoto.changePage('next');};}
$.prettyPhoto.stopSlideshow=function(){$pp_pic_holder.find('.pp_pause').unbind('click').removeClass('pp_pause').addClass('pp_play').click(function(){$.prettyPhoto.startSlideshow();return false;});clearInterval(pp_slideshow);pp_slideshow=undefined;}
$.prettyPhoto.close=function(){if($pp_overlay.is(":animated"))return;$.prettyPhoto.stopSlideshow();$pp_pic_holder.stop().find('object,embed').css('visibility','hidden');$('div.pp_pic_holder,div.ppt,.pp_fade').fadeOut(settings.animation_speed,function(){$(this).remove();});$pp_overlay.fadeOut(settings.animation_speed,function(){if($.browser.msie&&$.browser.version==6)$('select').css('visibility','visible');if(settings.hideflash)$('object,embed,iframe[src*=youtube],iframe[src*=vimeo]').css('visibility','visible');$(this).remove();$(window).unbind('scroll.prettyphoto');clearHashtag();settings.callback();doresize=true;pp_open=false;delete settings;});};function _showContent(){$('.pp_loaderIcon').hide();projectedTop=scroll_pos['scrollTop']+((windowHeight/2)-(pp_dimensions['containerHeight']/2));if(projectedTop<0)projectedTop=0;$ppt.fadeTo(settings.animation_speed,1);$pp_pic_holder.find('.pp_content').animate({height:pp_dimensions['contentHeight'],width:pp_dimensions['contentWidth']},settings.animation_speed);$pp_pic_holder.animate({'top':projectedTop,'left':(windowWidth/2)-(pp_dimensions['containerWidth']/2),width:pp_dimensions['containerWidth']},settings.animation_speed,function(){$pp_pic_holder.find('.pp_hoverContainer,#fullResImage').height(pp_dimensions['height']).width(pp_dimensions['width']);$pp_pic_holder.find('.pp_fade').fadeIn(settings.animation_speed);if(isSet&&_getFileType(pp_images[set_position])=="image"){$pp_pic_holder.find('.pp_hoverContainer').show();}else{$pp_pic_holder.find('.pp_hoverContainer').hide();}
if(pp_dimensions['resized']){$('a.pp_expand,a.pp_contract').show();}else{$('a.pp_expand').hide();}
if(settings.autoplay_slideshow&&!pp_slideshow&&!pp_open)$.prettyPhoto.startSlideshow();settings.changepicturecallback();pp_open=true;});_insert_gallery();};function _hideContent(callback){$pp_pic_holder.find('#pp_full_res object,#pp_full_res embed').css('visibility','hidden');$pp_pic_holder.find('.pp_fade').fadeOut(settings.animation_speed,function(){$('.pp_loaderIcon').show();callback();});};function _checkPosition(setCount){(setCount>1)?$('.pp_nav').show():$('.pp_nav').hide();};function _fitToViewport(width,height){resized=false;_getDimensions(width,height);imageWidth=width,imageHeight=height;if(((pp_containerWidth>windowWidth)||(pp_containerHeight>windowHeight))&&doresize&&settings.allow_resize&&!percentBased){resized=true,fitting=false;while(!fitting){if((pp_containerWidth>windowWidth)){imageWidth=(windowWidth-200);imageHeight=(height/width)*imageWidth;}else if((pp_containerHeight>windowHeight)){imageHeight=(windowHeight-200);imageWidth=(width/height)*imageHeight;}else{fitting=true;};pp_containerHeight=imageHeight,pp_containerWidth=imageWidth;};_getDimensions(imageWidth,imageHeight);if((pp_containerWidth>windowWidth)||(pp_containerHeight>windowHeight)){_fitToViewport(pp_containerWidth,pp_containerHeight)};};return{width:Math.floor(imageWidth),height:Math.floor(imageHeight),containerHeight:Math.floor(pp_containerHeight),containerWidth:Math.floor(pp_containerWidth)+(settings.horizontal_padding*2),contentHeight:Math.floor(pp_contentHeight),contentWidth:Math.floor(pp_contentWidth),resized:resized};};function _getDimensions(width,height){width=parseFloat(width);height=parseFloat(height);$pp_details=$pp_pic_holder.find('.pp_details');$pp_details.width(width);detailsHeight=parseFloat($pp_details.css('marginTop'))+parseFloat($pp_details.css('marginBottom'));$pp_details=$pp_details.clone().addClass(settings.theme).width(width).appendTo($('body')).css({'position':'absolute','top':-10000});detailsHeight+=$pp_details.height();detailsHeight=(detailsHeight<=34)?36:detailsHeight;if($.browser.msie&&$.browser.version==7)detailsHeight+=8;$pp_details.remove();$pp_title=$pp_pic_holder.find('.ppt');$pp_title.width(width);titleHeight=parseFloat($pp_title.css('marginTop'))+parseFloat($pp_title.css('marginBottom'));$pp_title=$pp_title.clone().appendTo($('body')).css({'position':'absolute','top':-10000});titleHeight+=$pp_title.height();$pp_title.remove();pp_contentHeight=height+detailsHeight;pp_contentWidth=width;pp_containerHeight=pp_contentHeight+titleHeight+$pp_pic_holder.find('.pp_top').height()+$pp_pic_holder.find('.pp_bottom').height();pp_containerWidth=width;}
function _getFileType(itemSrc){if(itemSrc.match(/youtube\.com\/watch/i)||itemSrc.match(/youtu\.be/i)){return'youtube';}else if(itemSrc.match(/vimeo\.com/i)){return'vimeo';}else if(itemSrc.match(/\b.mov\b/i)){return'quicktime';}else if(itemSrc.match(/\b.swf\b/i)){return'flash';}else if(itemSrc.match(/\biframe=true\b/i)){return'iframe';}else if(itemSrc.match(/\bajax=true\b/i)){return'ajax';}else if(itemSrc.match(/\bcustom=true\b/i)){return'custom';}else if(itemSrc.substr(0,1)=='#'){return'inline';}else{return'image';};};function _center_overlay(){if(doresize&&typeof $pp_pic_holder!='undefined'){scroll_pos=_get_scroll();contentHeight=$pp_pic_holder.height(),contentwidth=$pp_pic_holder.width();projectedTop=(windowHeight/2)+scroll_pos['scrollTop']-(contentHeight/2);if(projectedTop<0)projectedTop=0;if(contentHeight>windowHeight)
return;$pp_pic_holder.css({'top':projectedTop,'left':(windowWidth/2)+scroll_pos['scrollLeft']-(contentwidth/2)});};};function _get_scroll(){if(self.pageYOffset){return{scrollTop:self.pageYOffset,scrollLeft:self.pageXOffset};}else if(document.documentElement&&document.documentElement.scrollTop){return{scrollTop:document.documentElement.scrollTop,scrollLeft:document.documentElement.scrollLeft};}else if(document.body){return{scrollTop:document.body.scrollTop,scrollLeft:document.body.scrollLeft};};};function _resize_overlay(){windowHeight=$(window).height(),windowWidth=$(window).width();if(typeof $pp_overlay!="undefined")$pp_overlay.height($(document).height()).width(windowWidth);};function _insert_gallery(){if(isSet&&settings.overlay_gallery&&_getFileType(pp_images[set_position])=="image"&&(settings.ie6_fallback&&!($.browser.msie&&parseInt($.browser.version)==6))){itemWidth=52+5;navWidth=(settings.theme=="facebook"||settings.theme=="pp_default")?50:30;itemsPerPage=Math.floor((pp_dimensions['containerWidth']-100-navWidth)/itemWidth);itemsPerPage=(itemsPerPage<pp_images.length)?itemsPerPage:pp_images.length;totalPage=Math.ceil(pp_images.length/itemsPerPage)-1;if(totalPage==0){navWidth=0;$pp_gallery.find('.pp_arrow_next,.pp_arrow_previous').hide();}else{$pp_gallery.find('.pp_arrow_next,.pp_arrow_previous').show();};galleryWidth=itemsPerPage*itemWidth;fullGalleryWidth=pp_images.length*itemWidth;$pp_gallery.css('margin-left',-((galleryWidth/2)+(navWidth/2))).find('div:first').width(galleryWidth+5).find('ul').width(fullGalleryWidth).find('li.selected').removeClass('selected');goToPage=(Math.floor(set_position/itemsPerPage)<totalPage)?Math.floor(set_position/itemsPerPage):totalPage;$.prettyPhoto.changeGalleryPage(goToPage);$pp_gallery_li.filter(':eq('+set_position+')').addClass('selected');}else{$pp_pic_holder.find('.pp_content').unbind('mouseenter mouseleave');}}
function _build_overlay(caller){if(settings.social_tools)
facebook_like_link=settings.social_tools.replace('{location_href}',encodeURIComponent(location.href));settings.markup=settings.markup.replace('{pp_social}',(settings.social_tools)?facebook_like_link:'');$('body').append(settings.markup);$pp_pic_holder=$('.pp_pic_holder'),$ppt=$('.ppt'),$pp_overlay=$('div.pp_overlay');if(isSet&&settings.overlay_gallery){currentGalleryPage=0;toInject="";for(var i=0;i<pp_images.length;i++){if(!pp_images[i].match(/\b(jpg|jpeg|png|gif)\b/gi)){classname='default';img_src='';}else{classname='';img_src=pp_images[i];}
toInject+="<li class='"+classname+"'><a href='#'><img src='"+img_src+"' width='50' alt='' /></a></li>";};toInject=settings.gallery_markup.replace(/{gallery}/g,toInject);$pp_pic_holder.find('#pp_full_res').after(toInject);$pp_gallery=$('.pp_pic_holder .pp_gallery'),$pp_gallery_li=$pp_gallery.find('li');$pp_gallery.find('.pp_arrow_next').click(function(){$.prettyPhoto.changeGalleryPage('next');$.prettyPhoto.stopSlideshow();return false;});$pp_gallery.find('.pp_arrow_previous').click(function(){$.prettyPhoto.changeGalleryPage('previous');$.prettyPhoto.stopSlideshow();return false;});$pp_pic_holder.find('.pp_content').hover(function(){$pp_pic_holder.find('.pp_gallery:not(.disabled)').fadeIn();},function(){$pp_pic_holder.find('.pp_gallery:not(.disabled)').fadeOut();});itemWidth=52+5;$pp_gallery_li.each(function(i){$(this).find('a').click(function(){$.prettyPhoto.changePage(i);$.prettyPhoto.stopSlideshow();return false;});});};if(settings.slideshow){$pp_pic_holder.find('.pp_nav').prepend('<a href="#" class="pp_play">Play</a>')
$pp_pic_holder.find('.pp_nav .pp_play').click(function(){$.prettyPhoto.startSlideshow();return false;});}
$pp_pic_holder.attr('class','pp_pic_holder '+settings.theme);$pp_overlay.css({'opacity':0,'height':$(document).height(),'width':$(window).width()}).bind('click',function(){if(!settings.modal)$.prettyPhoto.close();});$('a.pp_close').bind('click',function(){$.prettyPhoto.close();return false;});$('a.pp_expand').bind('click',function(e){if($(this).hasClass('pp_expand')){$(this).removeClass('pp_expand').addClass('pp_contract');doresize=false;}else{$(this).removeClass('pp_contract').addClass('pp_expand');doresize=true;};_hideContent(function(){$.prettyPhoto.open();});return false;});$pp_pic_holder.find('.pp_previous, .pp_nav .pp_arrow_previous').bind('click',function(){$.prettyPhoto.changePage('previous');$.prettyPhoto.stopSlideshow();return false;});$pp_pic_holder.find('.pp_next, .pp_nav .pp_arrow_next').bind('click',function(){$.prettyPhoto.changePage('next');$.prettyPhoto.stopSlideshow();return false;});_center_overlay();};if(!pp_alreadyInitialized&&getHashtag()){pp_alreadyInitialized=true;hashIndex=getHashtag();hashRel=hashIndex;hashIndex=hashIndex.substring(hashIndex.indexOf('/')+1,hashIndex.length-1);hashRel=hashRel.substring(0,hashRel.indexOf('/'));setTimeout(function(){$("a[rel^='"+hashRel+"']:eq("+hashIndex+")").trigger('click');},50);}
return this.unbind('click.prettyphoto').bind('click.prettyphoto',$.prettyPhoto.initialize);};function getHashtag(){url=location.href;hashtag=(url.indexOf('#!')!=-1)?decodeURI(url.substring(url.indexOf('#!')+2,url.length)):false;return hashtag;};function setHashtag(){if(typeof theRel=='undefined')return;location.hash='!'+theRel+'/'+rel_index+'/';};function clearHashtag(){url=location.href;hashtag=(url.indexOf('#!prettyPhoto'))?true:false;if(hashtag)location.hash="!prettyPhoto";}
function getParam(name,url){name=name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");var regexS="[\\?&]"+name+"=([^&#]*)";var regex=new RegExp(regexS);var results=regex.exec(url);return(results==null)?"":results[1];}})(jQuery);var pp_alreadyInitialized=false;

/* Modernizr 2.0.6 (Custom Build) | MIT & BSD
 * Build: http://www.modernizr.com/download/#-fontface-borderradius-boxshadow-rgba-textshadow-cssanimations-cssgradients-csstransitions-canvas-canvastext-video-input-mq-cssclasses-teststyles-testprop-testallprops-hasevent-prefixes-domprefixes-load
 */
;window.Modernizr=function(a,b,c){function G(){e.input=function(a){for(var b=0,c=a.length;b<c;b++)r[a[b]]=a[b]in l;return r}("autocomplete autofocus list placeholder max min multiple pattern required step".split(" "))}function E(a,b){var c=a.charAt(0).toUpperCase()+a.substr(1),d=(a+" "+o.join(c+" ")+c).split(" ");return D(d,b)}function D(a,b){for(var d in a)if(k[a[d]]!==c)return b=="pfx"?a[d]:!0;return!1}function C(a,b){return!!~(""+a).indexOf(b)}function B(a,b){return typeof a===b}function A(a,b){return z(n.join(a+";")+(b||""))}function z(a){k.cssText=a}var d="2.0.6",e={},f=!0,g=b.documentElement,h=b.head||b.getElementsByTagName("head")[0],i="modernizr",j=b.createElement(i),k=j.style,l=b.createElement("input"),m=Object.prototype.toString,n=" -webkit- -moz- -o- -ms- -khtml- ".split(" "),o="Webkit Moz O ms Khtml".split(" "),p={},q={},r={},s=[],t=function(a,c,d,e){var f,h,j,k=b.createElement("div");if(parseInt(d,10))while(d--)j=b.createElement("div"),j.id=e?e[d]:i+(d+1),k.appendChild(j);f=["&shy;","<style>",a,"</style>"].join(""),k.id=i,k.innerHTML+=f,g.appendChild(k),h=c(k,a),k.parentNode.removeChild(k);return!!h},u=function(b){if(a.matchMedia)return matchMedia(b).matches;var c;t("@media "+b+" { #"+i+" { position: absolute; } }",function(b){c=(a.getComputedStyle?getComputedStyle(b,null):b.currentStyle).position=="absolute"});return c},v=function(){function d(d,e){e=e||b.createElement(a[d]||"div"),d="on"+d;var f=d in e;f||(e.setAttribute||(e=b.createElement("div")),e.setAttribute&&e.removeAttribute&&(e.setAttribute(d,""),f=B(e[d],"function"),B(e[d],c)||(e[d]=c),e.removeAttribute(d))),e=null;return f}var a={select:"input",change:"input",submit:"form",reset:"form",error:"img",load:"img",abort:"img"};return d}(),w,x={}.hasOwnProperty,y;!B(x,c)&&!B(x.call,c)?y=function(a,b){return x.call(a,b)}:y=function(a,b){return b in a&&B(a.constructor.prototype[b],c)};var F=function(a,c){var d=a.join(""),f=c.length;t(d,function(a,c){var d=b.styleSheets[b.styleSheets.length-1],g=d.cssRules&&d.cssRules[0]?d.cssRules[0].cssText:d.cssText||"",h=a.childNodes,i={};while(f--)i[h[f].id]=h[f];e.fontface=/src/i.test(g)&&g.indexOf(c.split(" ")[0])===0},f,c)}(['@font-face {font-family:"font";src:url("https://")}'],["fontface"]);p.canvas=function(){var a=b.createElement("canvas");return!!a.getContext&&!!a.getContext("2d")},p.canvastext=function(){return!!e.canvas&&!!B(b.createElement("canvas").getContext("2d").fillText,"function")},p.rgba=function(){z("background-color:rgba(150,255,150,.5)");return C(k.backgroundColor,"rgba")},p.borderradius=function(){return E("borderRadius")},p.boxshadow=function(){return E("boxShadow")},p.textshadow=function(){return b.createElement("div").style.textShadow===""},p.cssanimations=function(){return E("animationName")},p.cssgradients=function(){var a="background-image:",b="gradient(linear,left top,right bottom,from(#9f9),to(white));",c="linear-gradient(left top,#9f9, white);";z((a+n.join(b+a)+n.join(c+a)).slice(0,-a.length));return C(k.backgroundImage,"gradient")},p.csstransitions=function(){return E("transitionProperty")},p.fontface=function(){return e.fontface},p.video=function(){var a=b.createElement("video"),c=!1;try{if(c=!!a.canPlayType){c=new Boolean(c),c.ogg=a.canPlayType('video/ogg; codecs="theora"');var d='video/mp4; codecs="avc1.42E01E';c.h264=a.canPlayType(d+'"')||a.canPlayType(d+', mp4a.40.2"'),c.webm=a.canPlayType('video/webm; codecs="vp8, vorbis"')}}catch(e){}return c};for(var H in p)y(p,H)&&(w=H.toLowerCase(),e[w]=p[H](),s.push((e[w]?"":"no-")+w));e.input||G(),z(""),j=l=null,e._version=d,e._prefixes=n,e._domPrefixes=o,e.mq=u,e.hasEvent=v,e.testProp=function(a){return D([a])},e.testAllProps=E,e.testStyles=t,g.className=g.className.replace(/\bno-js\b/,"")+(f?" js "+s.join(" "):"");return e}(this,this.document),function(a,b,c){function k(a){return!a||a=="loaded"||a=="complete"}function j(){var a=1,b=-1;while(p.length- ++b)if(p[b].s&&!(a=p[b].r))break;a&&g()}function i(a){var c=b.createElement("script"),d;c.src=a.s,c.onreadystatechange=c.onload=function(){!d&&k(c.readyState)&&(d=1,j(),c.onload=c.onreadystatechange=null)},m(function(){d||(d=1,j())},H.errorTimeout),a.e?c.onload():n.parentNode.insertBefore(c,n)}function h(a){var c=b.createElement("link"),d;c.href=a.s,c.rel="stylesheet",c.type="text/css";if(!a.e&&(w||r)){var e=function(a){m(function(){if(!d)try{a.sheet.cssRules.length?(d=1,j()):e(a)}catch(b){b.code==1e3||b.message=="security"||b.message=="denied"?(d=1,m(function(){j()},0)):e(a)}},0)};e(c)}else c.onload=function(){d||(d=1,m(function(){j()},0))},a.e&&c.onload();m(function(){d||(d=1,j())},H.errorTimeout),!a.e&&n.parentNode.insertBefore(c,n)}function g(){var a=p.shift();q=1,a?a.t?m(function(){a.t=="c"?h(a):i(a)},0):(a(),j()):q=0}function f(a,c,d,e,f,h){function i(){!o&&k(l.readyState)&&(r.r=o=1,!q&&j(),l.onload=l.onreadystatechange=null,m(function(){u.removeChild(l)},0))}var l=b.createElement(a),o=0,r={t:d,s:c,e:h};l.src=l.data=c,!s&&(l.style.display="none"),l.width=l.height="0",a!="object"&&(l.type=d),l.onload=l.onreadystatechange=i,a=="img"?l.onerror=i:a=="script"&&(l.onerror=function(){r.e=r.r=1,g()}),p.splice(e,0,r),u.insertBefore(l,s?null:n),m(function(){o||(u.removeChild(l),r.r=r.e=o=1,j())},H.errorTimeout)}function e(a,b,c){var d=b=="c"?z:y;q=0,b=b||"j",C(a)?f(d,a,b,this.i++,l,c):(p.splice(this.i++,0,a),p.length==1&&g());return this}function d(){var a=H;a.loader={load:e,i:0};return a}var l=b.documentElement,m=a.setTimeout,n=b.getElementsByTagName("script")[0],o={}.toString,p=[],q=0,r="MozAppearance"in l.style,s=r&&!!b.createRange().compareNode,t=r&&!s,u=s?l:n.parentNode,v=a.opera&&o.call(a.opera)=="[object Opera]",w="webkitAppearance"in l.style,x=w&&"async"in b.createElement("script"),y=r?"object":v||x?"img":"script",z=w?"img":y,A=Array.isArray||function(a){return o.call(a)=="[object Array]"},B=function(a){return Object(a)===a},C=function(a){return typeof a=="string"},D=function(a){return o.call(a)=="[object Function]"},E=[],F={},G,H;H=function(a){function f(a){var b=a.split("!"),c=E.length,d=b.pop(),e=b.length,f={url:d,origUrl:d,prefixes:b},g,h;for(h=0;h<e;h++)g=F[b[h]],g&&(f=g(f));for(h=0;h<c;h++)f=E[h](f);return f}function e(a,b,e,g,h){var i=f(a),j=i.autoCallback;if(!i.bypass){b&&(b=D(b)?b:b[a]||b[g]||b[a.split("/").pop().split("?")[0]]);if(i.instead)return i.instead(a,b,e,g,h);e.load(i.url,i.forceCSS||!i.forceJS&&/css$/.test(i.url)?"c":c,i.noexec),(D(b)||D(j))&&e.load(function(){d(),b&&b(i.origUrl,h,g),j&&j(i.origUrl,h,g)})}}function b(a,b){function c(a){if(C(a))e(a,h,b,0,d);else if(B(a))for(i in a)a.hasOwnProperty(i)&&e(a[i],h,b,i,d)}var d=!!a.test,f=d?a.yep:a.nope,g=a.load||a.both,h=a.callback,i;c(f),c(g),a.complete&&b.load(a.complete)}var g,h,i=this.yepnope.loader;if(C(a))e(a,0,i,0);else if(A(a))for(g=0;g<a.length;g++)h=a[g],C(h)?e(h,0,i,0):A(h)?H(h):B(h)&&b(h,i);else B(a)&&b(a,i)},H.addPrefix=function(a,b){F[a]=b},H.addFilter=function(a){E.push(a)},H.errorTimeout=1e4,b.readyState==null&&b.addEventListener&&(b.readyState="loading",b.addEventListener("DOMContentLoaded",G=function(){b.removeEventListener("DOMContentLoaded",G,0),b.readyState="complete"},0)),a.yepnope=d()}(this,this.document),Modernizr.load=function(){yepnope.apply(window,[].slice.call(arguments,0))};


/*
MOBILE SELECT MENU
 */

(function($){

  //variable for storing the menu count when no ID is present
  var menuCount = 0;
  
  //plugin code
  $.fn.mobileMenu = function(options){
    
    //plugin's default options
    var settings = {
      switchWidth: 768,
      topOptionText: 'Select a page',
      indentString: '&nbsp;&nbsp;&nbsp;'
    };
    
    
    //function to check if selector matches a list
    function isList($this){
      return $this.is('ul, ol');
    }
  
  
    //function to decide if mobile or not
    function isMobile(){
      return ($(window).width() < settings.switchWidth);
    }
    
    
    //check if dropdown exists for the current element
    function menuExists($this){
      
      //if the list has an ID, use it to give the menu an ID
      if($this.attr('id')){
        return ($('#mobileMenu_'+$this.attr('id')).length > 0);
      } 
      
      //otherwise, give the list and select elements a generated ID
      else {
        menuCount++;
        $this.attr('id', 'mm'+menuCount);
        return ($('#mobileMenu_mm'+menuCount).length > 0);
      }
    }
    
    
    //change page on mobile menu selection
    function goToPage($this){
      if($this.val() !== null){document.location.href = $this.val()}
    }
    
    
    //show the mobile menu
    function showMenu($this){
      $this.css('display', 'none');
      $('#mobileMenu_'+$this.attr('id')).show();
    }
    
    
    //hide the mobile menu
    function hideMenu($this){
      $this.css('display', '');
      $('#mobileMenu_'+$this.attr('id')).hide();
    }
    
    
    //create the mobile menu
    function createMenu($this){
      if(isList($this)){
                
        //generate select element as a string to append via jQuery
        var selectString = '<select id="mobileMenu_'+$this.attr('id')+'" class="mobileMenu">';
        
        //create first option (no value)
        selectString += '<option value="">'+settings.topOptionText+'</option>';
        
        //loop through list items
        $this.find('li').each(function(){
          
          //when sub-item, indent
          var levelStr = '';
          var len = $(this).parents('ul, ol').length;
          for(i=1;i<len;i++){levelStr += settings.indentString;}
          
          //get url and text for option
          var link = $(this).find('a:first-child').attr('href');
          var text = levelStr + $(this).clone().children('ul, ol').remove().end().text();
          
          //add option
          selectString += '<option value="'+link+'">'+text+'</option>';
        });
        
        selectString += '</select>';
        
        //append select element to ul/ol's container
        $this.parent().append(selectString);
        
        //add change event handler for mobile menu
        $('#mobileMenu_'+$this.attr('id')).change(function(){
          goToPage($(this));
        });
        
        //hide current menu, show mobile menu
        showMenu($this);
      } else {
        alert('mobileMenu will only work with UL or OL elements!');
      }
    }
    
    
    //plugin functionality
    function run($this){
      
      //menu doesn't exist
      if(isMobile() && !menuExists($this)){
        createMenu($this);
      }
      
      //menu already exists
      else if(isMobile() && menuExists($this)){
        showMenu($this);
      }
      
      //not mobile browser
      else if(!isMobile() && menuExists($this)){
        hideMenu($this);
      }

    }
    
    //run plugin on each matched ul/ol
    //maintain chainability by returning "this"
    return this.each(function() {
      
      //override the default settings if user provides some
      if(options){$.extend(settings, options);}
      
      //cache "this"
      var $this = $(this);
    
      //bind event to browser resize
      $(window).resize(function(){run($this);});

      //run plugin
      run($this);

    });
    
  };
  
})(jQuery);

/*
 * Superfish v1.4.8 - jQuery menu widget
 * Copyright (c) 2008 Joel Birch
 *
 * Dual licensed under the MIT and GPL licenses:
 * 	http://www.opensource.org/licenses/mit-license.php
 * 	http://www.gnu.org/licenses/gpl.html
 *
 * CHANGELOG: http://users.tpg.com.au/j_birch/plugins/superfish/changelog.txt
 */

;(function($){
	$.fn.superfish = function(op){

		var sf = $.fn.superfish,
			c = sf.c,
			$arrow = $(['<span class="',c.arrowClass,'"> &#187;</span>'].join('')),
			over = function(){
				var $$ = $(this), menu = getMenu($$);
				clearTimeout(menu.sfTimer);
				$$.showSuperfishUl().siblings().hideSuperfishUl();
			},
			out = function(){
				var $$ = $(this), menu = getMenu($$), o = sf.op;
				clearTimeout(menu.sfTimer);
				menu.sfTimer=setTimeout(function(){
					o.retainPath=($.inArray($$[0],o.$path)>-1);
					$$.hideSuperfishUl();
					if (o.$path.length && $$.parents(['li.',o.hoverClass].join('')).length<1){over.call(o.$path);}
				},o.delay);	
			},
			getMenu = function($menu){
				var menu = $menu.parents(['ul.',c.menuClass,':first'].join(''))[0];
				sf.op = sf.o[menu.serial];
				return menu;
			},
			addArrow = function($a){ $a.addClass(c.anchorClass).append($arrow.clone()); };
			
		return this.each(function() {
			var s = this.serial = sf.o.length;
			var o = $.extend({},sf.defaults,op);
			o.$path = $('li.'+o.pathClass,this).slice(0,o.pathLevels).each(function(){
				$(this).addClass([o.hoverClass,c.bcClass].join(' '))
					.filter('li:has(ul)').removeClass(o.pathClass);
			});
			sf.o[s] = sf.op = o;
			
			$('li:has(ul)',this)[($.fn.hoverIntent && !o.disableHI) ? 'hoverIntent' : 'hover'](over,out).each(function() {
				if (o.autoArrows) addArrow( $('>a:first-child',this) );
			})
			.not('.'+c.bcClass)
				.hideSuperfishUl();
			
			var $a = $('a',this);
			$a.each(function(i){
				var $li = $a.eq(i).parents('li');
				$a.eq(i).focus(function(){over.call($li);}).blur(function(){out.call($li);});
			});
			o.onInit.call(this);
			
		}).each(function() {
			var menuClasses = [c.menuClass];
			if (sf.op.dropShadows  && !($.browser.msie && $.browser.version < 7)) menuClasses.push(c.shadowClass);
			$(this).addClass(menuClasses.join(' '));
		});
	};

	var sf = $.fn.superfish;
	sf.o = [];
	sf.op = {};
	sf.IE7fix = function(){
		var o = sf.op;
		if ($.browser.msie && $.browser.version > 6 && o.dropShadows && o.animation.opacity!=undefined)
			this.toggleClass(sf.c.shadowClass+'-off');
		};
	sf.c = {
		bcClass     : 'sf-breadcrumb',
		menuClass   : 'sf-js-enabled',
		anchorClass : 'sf-with-ul',
		arrowClass  : 'sf-sub-indicator',
		shadowClass : 'sf-shadow'
	};
	sf.defaults = {
		hoverClass	: 'sfHover',
		pathClass	: 'overideThisToUse',
		pathLevels	: 1,
		delay		: 800,
		animation	: {opacity:'show'},
		speed		: 'normal',
		autoArrows	: true,
		dropShadows : true,
		disableHI	: false,		// true disables hoverIntent detection
		onInit		: function(){}, // callback functions
		onBeforeShow: function(){},
		onShow		: function(){},
		onHide		: function(){}
	};
	$.fn.extend({
		hideSuperfishUl : function(){
			var o = sf.op,
				not = (o.retainPath===true) ? o.$path : '';
			o.retainPath = false;
			var $ul = $(['li.',o.hoverClass].join(''),this).add(this).not(not).removeClass(o.hoverClass)
					.find('>ul').hide().css('visibility','hidden');
			o.onHide.call($ul);
			return this;
		},
		showSuperfishUl : function(){
			var o = sf.op,
				sh = sf.c.shadowClass+'-off',
				$ul = this.addClass(o.hoverClass)
					.find('>ul:hidden').css('visibility','visible');
			sf.IE7fix.call($ul);
			o.onBeforeShow.call($ul);
			$ul.animate(o.animation,o.speed,function(){ sf.IE7fix.call($ul); o.onShow.call($ul); });
			return this;
		}
	});

})(jQuery);
(function($){
	/* hoverIntent by Brian Cherne */
	$.fn.hoverIntent = function(f,g) {
		// default configuration options
		var cfg = {
			sensitivity: 7,
			interval: 100,
			timeout: 0
		};
		// override configuration options with user supplied object
		cfg = $.extend(cfg, g ? { over: f, out: g } : f );

		// instantiate variables
		// cX, cY = current X and Y position of mouse, updated by mousemove event
		// pX, pY = previous X and Y position of mouse, set by mouseover and polling interval
		var cX, cY, pX, pY;

		// A private function for getting mouse position
		var track = function(ev) {
			cX = ev.pageX;
			cY = ev.pageY;
		};

		// A private function for comparing current and previous mouse position
		var compare = function(ev,ob) {
			ob.hoverIntent_t = clearTimeout(ob.hoverIntent_t);
			// compare mouse positions to see if they've crossed the threshold
			if ( ( Math.abs(pX-cX) + Math.abs(pY-cY) ) < cfg.sensitivity ) {
				$(ob).unbind("mousemove",track);
				// set hoverIntent state to true (so mouseOut can be called)
				ob.hoverIntent_s = 1;
				return cfg.over.apply(ob,[ev]);
			} else {
				// set previous coordinates for next time
				pX = cX; pY = cY;
				// use self-calling timeout, guarantees intervals are spaced out properly (avoids JavaScript timer bugs)
				ob.hoverIntent_t = setTimeout( function(){compare(ev, ob);} , cfg.interval );
			}
		};

		// A private function for delaying the mouseOut function
		var delay = function(ev,ob) {
			ob.hoverIntent_t = clearTimeout(ob.hoverIntent_t);
			ob.hoverIntent_s = 0;
			return cfg.out.apply(ob,[ev]);
		};

		// A private function for handling mouse 'hovering'
		var handleHover = function(e) {
			// next three lines copied from jQuery.hover, ignore children onMouseOver/onMouseOut
			var p = (e.type == "mouseover" ? e.fromElement : e.toElement) || e.relatedTarget;
			while ( p && p != this ) { try { p = p.parentNode; } catch(e) { p = this; } }
			if ( p == this ) { return false; }

			// copy objects to be passed into t (required for event object to be passed in IE)
			var ev = jQuery.extend({},e);
			var ob = this;

			// cancel hoverIntent timer if it exists
			if (ob.hoverIntent_t) { ob.hoverIntent_t = clearTimeout(ob.hoverIntent_t); }

			// else e.type == "onmouseover"
			if (e.type == "mouseover") {
				// set "previous" X and Y position based on initial entry point
				pX = ev.pageX; pY = ev.pageY;
				// update "current" X and Y position based on mousemove
				$(ob).bind("mousemove",track);
				// start polling interval (self-calling timeout) to compare mouse coordinates over time
				if (ob.hoverIntent_s != 1) { ob.hoverIntent_t = setTimeout( function(){compare(ev,ob);} , cfg.interval );}

			// else e.type == "onmouseout"
			} else {
				// unbind expensive mousemove event
				$(ob).unbind("mousemove",track);
				// if hoverIntent state is true, then call the mouseOut function after the specified delay
				if (ob.hoverIntent_s == 1) { ob.hoverIntent_t = setTimeout( function(){delay(ev,ob);} , cfg.timeout );}
			}
		};

		// bind the function to the two event listeners
		return this.mouseover(handleHover).mouseout(handleHover);
	};
	
})(jQuery);
/*
 * Poshy Tip jQuery plugin v1.1
 * http://vadikom.com/tools/poshy-tip-jquery-plugin-for-stylish-tooltips/
 * Copyright 2010-2011, Vasil Dinkov, http://vadikom.com/
 */

(function($) {

	var tips = [],
		reBgImage = /^url\(["']?([^"'\)]*)["']?\);?$/i,
		rePNG = /\.png$/i,
		ie6 = $.browser.msie && $.browser.version == 6;

	// make sure the tips' position is updated on resize
	function handleWindowResize() {
		$.each(tips, function() {
			this.refresh(true);
		});
	}
	$(window).resize(handleWindowResize);

	$.Poshytip = function(elm, options) {
		this.$elm = $(elm);
		this.opts = $.extend({}, $.fn.poshytip.defaults, options);
		this.$tip = $(['<div class="',this.opts.className,'">',
				'<div class="tip-inner tip-bg-image"></div>',
				'<div class="tip-arrow tip-arrow-top tip-arrow-right tip-arrow-bottom tip-arrow-left"></div>',
			'</div>'].join('')).appendTo(document.body);
		this.$arrow = this.$tip.find('div.tip-arrow');
		this.$inner = this.$tip.find('div.tip-inner');
		this.disabled = false;
		this.content = null;
		this.init();
	};

	$.Poshytip.prototype = {
		init: function() {
			tips.push(this);

			// save the original title and a reference to the Poshytip object
			var title = this.$elm.attr('title');
			this.$elm.data('title.poshytip', title !== undefined ? title : null)
				.data('poshytip', this);

			// hook element events
			if (this.opts.showOn != 'none') {
				this.$elm.bind({
					'mouseenter.poshytip': $.proxy(this.mouseenter, this),
					'mouseleave.poshytip': $.proxy(this.mouseleave, this)
				});
				switch (this.opts.showOn) {
					case 'hover':
						if (this.opts.alignTo == 'cursor')
							this.$elm.bind('mousemove.poshytip', $.proxy(this.mousemove, this));
						if (this.opts.allowTipHover)
							this.$tip.hover($.proxy(this.clearTimeouts, this), $.proxy(this.mouseleave, this));
						break;
					case 'focus':
						this.$elm.bind({
							'focus.poshytip': $.proxy(this.show, this),
							'blur.poshytip': $.proxy(this.hide, this)
						});
						break;
				}
			}
		},
		mouseenter: function(e) {
			if (this.disabled)
				return true;

			this.$elm.attr('title', '');
			if (this.opts.showOn == 'focus')
				return true;

			this.clearTimeouts();
			this.showTimeout = setTimeout($.proxy(this.show, this), this.opts.showTimeout);
		},
		mouseleave: function(e) {
			if (this.disabled || this.asyncAnimating && (this.$tip[0] === e.relatedTarget || jQuery.contains(this.$tip[0], e.relatedTarget)))
				return true;

			var title = this.$elm.data('title.poshytip');
			if (title !== null)
				this.$elm.attr('title', title);
			if (this.opts.showOn == 'focus')
				return true;

			this.clearTimeouts();
			this.hideTimeout = setTimeout($.proxy(this.hide, this), this.opts.hideTimeout);
		},
		mousemove: function(e) {
			if (this.disabled)
				return true;

			this.eventX = e.pageX;
			this.eventY = e.pageY;
			if (this.opts.followCursor && this.$tip.data('active')) {
				this.calcPos();
				this.$tip.css({left: this.pos.l, top: this.pos.t});
				if (this.pos.arrow)
					this.$arrow[0].className = 'tip-arrow tip-arrow-' + this.pos.arrow;
			}
		},
		show: function() {
			if (this.disabled || this.$tip.data('active'))
				return;

			this.reset();
			this.update();
			this.display();
			if (this.opts.timeOnScreen)
				setTimeout($.proxy(this.hide, this), this.opts.timeOnScreen);
		},
		hide: function() {
			if (this.disabled || !this.$tip.data('active'))
				return;

			this.display(true);
		},
		reset: function() {
			this.$tip.queue([]).detach().css('visibility', 'hidden').data('active', false);
			this.$inner.find('*').poshytip('hide');
			if (this.opts.fade)
				this.$tip.css('opacity', this.opacity);
			this.$arrow[0].className = 'tip-arrow tip-arrow-top tip-arrow-right tip-arrow-bottom tip-arrow-left';
			this.asyncAnimating = false;
		},
		update: function(content, dontOverwriteOption) {
			if (this.disabled)
				return;

			var async = content !== undefined;
			if (async) {
				if (!dontOverwriteOption)
					this.opts.content = content;
				if (!this.$tip.data('active'))
					return;
			} else {
				content = this.opts.content;
			}

			// update content only if it has been changed since last time
			var self = this,
				newContent = typeof content == 'function' ?
					content.call(this.$elm[0], function(newContent) {
						self.update(newContent);
					}) :
					content == '[title]' ? this.$elm.data('title.poshytip') : content;
			if (this.content !== newContent) {
				this.$inner.empty().append(newContent);
				this.content = newContent;
			}

			this.refresh(async);
		},
		refresh: function(async) {
			if (this.disabled)
				return;

			if (async) {
				if (!this.$tip.data('active'))
					return;
				// save current position as we will need to animate
				var currPos = {left: this.$tip.css('left'), top: this.$tip.css('top')};
			}

			// reset position to avoid text wrapping, etc.
			this.$tip.css({left: 0, top: 0}).appendTo(document.body);

			// save default opacity
			if (this.opacity === undefined)
				this.opacity = this.$tip.css('opacity');

			// check for images - this code is here (i.e. executed each time we show the tip and not on init) due to some browser inconsistencies
			var bgImage = this.$tip.css('background-image').match(reBgImage),
				arrow = this.$arrow.css('background-image').match(reBgImage);

			if (bgImage) {
				var bgImagePNG = rePNG.test(bgImage[1]);
				// fallback to background-color/padding/border in IE6 if a PNG is used
				if (ie6 && bgImagePNG) {
					this.$tip.css('background-image', 'none');
					this.$inner.css({margin: 0, border: 0, padding: 0});
					bgImage = bgImagePNG = false;
				} else {
					this.$tip.prepend('<table border="0" cellpadding="0" cellspacing="0"><tr><td class="tip-top tip-bg-image" colspan="2"><span></span></td><td class="tip-right tip-bg-image" rowspan="2"><span></span></td></tr><tr><td class="tip-left tip-bg-image" rowspan="2"><span></span></td><td></td></tr><tr><td class="tip-bottom tip-bg-image" colspan="2"><span></span></td></tr></table>')
						.css({border: 0, padding: 0, 'background-image': 'none', 'background-color': 'transparent'})
						.find('.tip-bg-image').css('background-image', 'url("' + bgImage[1] +'")').end()
						.find('td').eq(3).append(this.$inner);
				}
				// disable fade effect in IE due to Alpha filter + translucent PNG issue
				if (bgImagePNG && !$.support.opacity)
					this.opts.fade = false;
			}
			// IE arrow fixes
			if (arrow && !$.support.opacity) {
				// disable arrow in IE6 if using a PNG
				if (ie6 && rePNG.test(arrow[1])) {
					arrow = false;
					this.$arrow.css('background-image', 'none');
				}
				// disable fade effect in IE due to Alpha filter + translucent PNG issue
				this.opts.fade = false;
			}

			var $table = this.$tip.find('table');
			if (ie6) {
				// fix min/max-width in IE6
				this.$tip[0].style.width = '';
				$table.width('auto').find('td').eq(3).width('auto');
				var tipW = this.$tip.width(),
					minW = parseInt(this.$tip.css('min-width')),
					maxW = parseInt(this.$tip.css('max-width'));
				if (!isNaN(minW) && tipW < minW)
					tipW = minW;
				else if (!isNaN(maxW) && tipW > maxW)
					tipW = maxW;
				this.$tip.add($table).width(tipW).eq(0).find('td').eq(3).width('100%');
			} else if ($table[0]) {
				// fix the table width if we are using a background image
				// IE9, FF4 use float numbers for width/height so use getComputedStyle for them to avoid text wrapping
				// for details look at: http://vadikom.com/dailies/offsetwidth-offsetheight-useless-in-ie9-firefox4/
				$table.width('auto').find('td').eq(3).width('auto').end().end().width(document.defaultView && document.defaultView.getComputedStyle && parseFloat(document.defaultView.getComputedStyle(this.$tip[0], null).width) || this.$tip.width()).find('td').eq(3).width('100%');
			}
			this.tipOuterW = this.$tip.outerWidth();
			this.tipOuterH = this.$tip.outerHeight();

			this.calcPos();

			// position and show the arrow image
			if (arrow && this.pos.arrow) {
				this.$arrow[0].className = 'tip-arrow tip-arrow-' + this.pos.arrow;
				this.$arrow.css('visibility', 'inherit');
			}

			if (async) {
				this.asyncAnimating = true;
				var self = this;
				this.$tip.css(currPos).animate({left: this.pos.l, top: this.pos.t}, 200, function() { self.asyncAnimating = false; });
			} else {
				this.$tip.css({left: this.pos.l, top: this.pos.t});
			}
		},
		display: function(hide) {
			var active = this.$tip.data('active');
			if (active && !hide || !active && hide)
				return;

			this.$tip.stop();
			if ((this.opts.slide && this.pos.arrow || this.opts.fade) && (hide && this.opts.hideAniDuration || !hide && this.opts.showAniDuration)) {
				var from = {}, to = {};
				// this.pos.arrow is only undefined when alignX == alignY == 'center' and we don't need to slide in that rare case
				if (this.opts.slide && this.pos.arrow) {
					var prop, arr;
					if (this.pos.arrow == 'bottom' || this.pos.arrow == 'top') {
						prop = 'top';
						arr = 'bottom';
					} else {
						prop = 'left';
						arr = 'right';
					}
					var val = parseInt(this.$tip.css(prop));
					from[prop] = val + (hide ? 0 : (this.pos.arrow == arr ? -this.opts.slideOffset : this.opts.slideOffset));
					to[prop] = val + (hide ? (this.pos.arrow == arr ? this.opts.slideOffset : -this.opts.slideOffset) : 0) + 'px';
				}
				if (this.opts.fade) {
					from.opacity = hide ? this.$tip.css('opacity') : 0;
					to.opacity = hide ? 0 : this.opacity;
				}
				this.$tip.css(from).animate(to, this.opts[hide ? 'hideAniDuration' : 'showAniDuration']);
			}
			hide ? this.$tip.queue($.proxy(this.reset, this)) : this.$tip.css('visibility', 'inherit');
			this.$tip.data('active', !active);
		},
		disable: function() {
			this.reset();
			this.disabled = true;
		},
		enable: function() {
			this.disabled = false;
		},
		destroy: function() {
			this.reset();
			this.$tip.remove();
			delete this.$tip;
			this.content = null;
			this.$elm.unbind('.poshytip').removeData('title.poshytip').removeData('poshytip');
			tips.splice($.inArray(this, tips), 1);
		},
		clearTimeouts: function() {
			if (this.showTimeout) {
				clearTimeout(this.showTimeout);
				this.showTimeout = 0;
			}
			if (this.hideTimeout) {
				clearTimeout(this.hideTimeout);
				this.hideTimeout = 0;
			}
		},
		calcPos: function() {
			var pos = {l: 0, t: 0, arrow: ''},
				$win = $(window),
				win = {
					l: $win.scrollLeft(),
					t: $win.scrollTop(),
					w: $win.width(),
					h: $win.height()
				}, xL, xC, xR, yT, yC, yB;
			if (this.opts.alignTo == 'cursor') {
				xL = xC = xR = this.eventX;
				yT = yC = yB = this.eventY;
			} else { // this.opts.alignTo == 'target'
				var elmOffset = this.$elm.offset(),
					elm = {
						l: elmOffset.left,
						t: elmOffset.top,
						w: this.$elm.outerWidth(),
						h: this.$elm.outerHeight()
					};
				xL = elm.l + (this.opts.alignX != 'inner-right' ? 0 : elm.w);	// left edge
				xC = xL + Math.floor(elm.w / 2);				// h center
				xR = xL + (this.opts.alignX != 'inner-left' ? elm.w : 0);	// right edge
				yT = elm.t + (this.opts.alignY != 'inner-bottom' ? 0 : elm.h);	// top edge
				yC = yT + Math.floor(elm.h / 2);				// v center
				yB = yT + (this.opts.alignY != 'inner-top' ? elm.h : 0);	// bottom edge
			}

			// keep in viewport and calc arrow position
			switch (this.opts.alignX) {
				case 'right':
				case 'inner-left':
					pos.l = xR + this.opts.offsetX;
					if (pos.l + this.tipOuterW > win.l + win.w)
						pos.l = win.l + win.w - this.tipOuterW;
					if (this.opts.alignX == 'right' || this.opts.alignY == 'center')
						pos.arrow = 'left';
					break;
				case 'center':
					pos.l = xC - Math.floor(this.tipOuterW / 2);
					if (pos.l + this.tipOuterW > win.l + win.w)
						pos.l = win.l + win.w - this.tipOuterW;
					else if (pos.l < win.l)
						pos.l = win.l;
					break;
				default: // 'left' || 'inner-right'
					pos.l = xL - this.tipOuterW - this.opts.offsetX;
					if (pos.l < win.l)
						pos.l = win.l;
					if (this.opts.alignX == 'left' || this.opts.alignY == 'center')
						pos.arrow = 'right';
			}
			switch (this.opts.alignY) {
				case 'bottom':
				case 'inner-top':
					pos.t = yB + this.opts.offsetY;
					// 'left' and 'right' need priority for 'target'
					if (!pos.arrow || this.opts.alignTo == 'cursor')
						pos.arrow = 'top';
					if (pos.t + this.tipOuterH > win.t + win.h) {
						pos.t = yT - this.tipOuterH - this.opts.offsetY;
						if (pos.arrow == 'top')
							pos.arrow = 'bottom';
					}
					break;
				case 'center':
					pos.t = yC - Math.floor(this.tipOuterH / 2);
					if (pos.t + this.tipOuterH > win.t + win.h)
						pos.t = win.t + win.h - this.tipOuterH;
					else if (pos.t < win.t)
						pos.t = win.t;
					break;
				default: // 'top' || 'inner-bottom'
					pos.t = yT - this.tipOuterH - this.opts.offsetY;
					// 'left' and 'right' need priority for 'target'
					if (!pos.arrow || this.opts.alignTo == 'cursor')
						pos.arrow = 'bottom';
					if (pos.t < win.t) {
						pos.t = yB + this.opts.offsetY;
						if (pos.arrow == 'bottom')
							pos.arrow = 'top';
					}
			}
			this.pos = pos;
		}
	};

	$.fn.poshytip = function(options) {
		if (typeof options == 'string') {
			var args = arguments,
				method = options;
			Array.prototype.shift.call(args);
			// unhook live events if 'destroy' is called
			if (method == 'destroy')
				this.die('mouseenter.poshytip').die('focus.poshytip');
			return this.each(function() {
				var poshytip = $(this).data('poshytip');
				if (poshytip && poshytip[method])
					poshytip[method].apply(poshytip, args);
			});
		}

		var opts = $.extend({}, $.fn.poshytip.defaults, options);

		// generate CSS for this tip class if not already generated
		if (!$('#poshytip-css-' + opts.className)[0])
			$(['<style id="poshytip-css-',opts.className,'" type="text/css">',
				'div.',opts.className,'{visibility:hidden;position:absolute;top:0;left:0;}',
				'div.',opts.className,' table, div.',opts.className,' td{margin:0;font-family:inherit;font-size:inherit;font-weight:inherit;font-style:inherit;font-variant:inherit;}',
				'div.',opts.className,' td.tip-bg-image span{display:block;font:1px/1px sans-serif;height:',opts.bgImageFrameSize,'px;width:',opts.bgImageFrameSize,'px;overflow:hidden;}',
				'div.',opts.className,' td.tip-right{background-position:100% 0;}',
				'div.',opts.className,' td.tip-bottom{background-position:100% 100%;}',
				'div.',opts.className,' td.tip-left{background-position:0 100%;}',
				'div.',opts.className,' div.tip-inner{background-position:-',opts.bgImageFrameSize,'px -',opts.bgImageFrameSize,'px;}',
				'div.',opts.className,' div.tip-arrow{visibility:hidden;position:absolute;overflow:hidden;font:1px/1px sans-serif;}',
			'</style>'].join('')).appendTo('head');

		// check if we need to hook live events
		if (opts.liveEvents && opts.showOn != 'none') {
			var deadOpts = $.extend({}, opts, { liveEvents: false });
			switch (opts.showOn) {
				case 'hover':
					this.live('mouseenter.poshytip', function() {
						var $this = $(this);
						if (!$this.data('poshytip'))
							$this.poshytip(deadOpts).poshytip('mouseenter');
					});
					break;
				case 'focus':
					this.live('focus.poshytip', function() {
						var $this = $(this);
						if (!$this.data('poshytip'))
							$this.poshytip(deadOpts).poshytip('show');
					});
					break;
			}
			return this;
		}

		return this.each(function() {
			new $.Poshytip(this, opts);
		});
	}

	// default settings
	$.fn.poshytip.defaults = {
		content: 		'[title]',	// content to display ('[title]', 'string', element, function(updateCallback){...}, jQuery)
		className:		'tip-yellow',	// class for the tips
		bgImageFrameSize:	10,		// size in pixels for the background-image (if set in CSS) frame around the inner content of the tip
		showTimeout:		500,		// timeout before showing the tip (in milliseconds 1000 == 1 second)
		hideTimeout:		100,		// timeout before hiding the tip
		timeOnScreen:		0,		// timeout before automatically hiding the tip after showing it (set to > 0 in order to activate)
		showOn:			'hover',	// handler for showing the tip ('hover', 'focus', 'none') - use 'none' to trigger it manually
		liveEvents:		false,		// use live events
		alignTo:		'cursor',	// align/position the tip relative to ('cursor', 'target')
		alignX:			'right',	// horizontal alignment for the tip relative to the mouse cursor or the target element
							// ('right', 'center', 'left', 'inner-left', 'inner-right') - 'inner-*' matter if alignTo:'target'
		alignY:			'top',		// vertical alignment for the tip relative to the mouse cursor or the target element
							// ('bottom', 'center', 'top', 'inner-bottom', 'inner-top') - 'inner-*' matter if alignTo:'target'
		offsetX:		-22,		// offset X pixels from the default position - doesn't matter if alignX:'center'
		offsetY:		18,		// offset Y pixels from the default position - doesn't matter if alignY:'center'
		allowTipHover:		true,		// allow hovering the tip without hiding it onmouseout of the target - matters only if showOn:'hover'
		followCursor:		false,		// if the tip should follow the cursor - matters only if showOn:'hover' and alignTo:'cursor'
		fade: 			true,		// use fade animation
		slide: 			true,		// use slide animation
		slideOffset: 		8,		// slide animation offset
		showAniDuration: 	300,		// show animation duration - set to 0 if you don't want show animation
		hideAniDuration: 	300		// hide animation duration - set to 0 if you don't want hide animation
	};

})(jQuery);
