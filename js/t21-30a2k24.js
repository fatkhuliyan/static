// <p><span class="spinner is-active"></span> <strong>Retrieving data please wait</strong></p>
function customLog(message, color='black') {
     switch (color) {
         case 'success':  
              color = 'Green';
              break
         case 'info':     
                 color = 'Blue';  
              break;
         case 'error':   
              color = 'Red';   
              break;
         case 'warning':  
              color = 'Orange' ;
              break;
         default: 
              color = color;
     }

     console.log(`%c${message}`, `color:${color}`);
}

console.time("fath-main-execute");
customLog('Main.js currently support for grab stream host and imdb with v_id', 'success');
console.log('%c%s','color: green; background: yellow; font-size: 24px;','fath-js Ready!');
if (/\/wp-admin\/post\.php\?.*?\=/.test(location.href)||/\/wp-admin\/post-new\.php/.test(location.href)){
    console.log('%c%s','color: green; background: yellow; font-size: 24px;','fath-js on input mode')
    jQuery("#minor-publishing-actions").append(`
    <hr>
    <div id="fath-custom-js" style="text-align: center;">
        <p><input type="text" id="fath-input-v_id" class="form-input-tip" value=""><span class="spinner spinner-grab"></span></p>
        <input type="button" class="button" id="fath-v_id" value="grab">
        <input type="button" class="button" id="fath-imdb" value="imdb">
    </div>`);
    
    jQuery("#fath-input-v_id").focus();
}

jQuery("#titlediv").after(` <strong><span id="hostStatus"> </span></strong>`);

let queryString = window.location.search;
let urlParams = new URLSearchParams(queryString);
let v_id = urlParams.get('v_id');
jQuery("#fath-input-v_id").val(v_id);

const addHostStatus = (hostName, status) => {
  if (!status) {
	  Notify(hostName);
    // const statusElement = `<span class="page-title-action" style="color:#df4545;">${hostName.toUpperCase()}</span> `;
      jQuery(`.${hostName}_status`).addClass("ffc_r");
      jQuery(`.${hostName}_status`).html(`<span class="ffm">â˜</span><code class="ffm"> ${hostName.toUpperCase()}</code>`);
  }else{
      jQuery(`.${hostName}_status`).addClass("ffc_g");
      jQuery(`.${hostName}_status`).html(`<span class="ffm">â˜‘</span><code class="ffm"> ${hostName.toUpperCase()}</code>`);
  }
};

function date_updater(early=false){
	let a = new Date();
    let m = ("0" + (a.getMonth() + early==true?0:1)).slice(-2);
    let d = ("0" + a.getDate()).slice(-2);
    let y = a.getFullYear();
    let mm = a.getMinutes();
    let hh = a.getHours();
	console.log(m);
    if(hh == 0){mm = 0;}else{hh = hh-1;}
    if (jQuery('select[name="mm"]').length > 0) jQuery('select[name="mm"]').val(m);
    if (jQuery('input[name="jj"]').length > 0) jQuery('input[name="jj"]').val(d);
    if (jQuery('input[name="aa"]').length > 0) jQuery('input[name="aa"]').val(y);
    if (jQuery('input[name="hh"]').length > 0) jQuery('input[name="hh"]').val(hh);
    if (jQuery('input[name="mn"]').length > 0) jQuery('input[name="mn"]').val(mm);
}

function data_grab(){
    jQuery('#post_author_override').val("6");
    date_updater();
    
    jQuery('#opsi-player5').val('');
    jQuery('#opsi-player3').val('');
    jQuery('#opsi-subeng').val('');
    if (jQuery('#fath-input-v_id').val()==""){
    	let uris = (location.href).match(/post=+.+&action/g);
    	jQuery.get("https://dash.fath.xyz/api/data.php?act=uri&s="+uris[0],(res)=>{
    		if(res[0].id==null||res[0].id=="")alert("NULL");
    		jQuery('#opsi-quality').val(/CAM/.test(res[0].quality)?'CAM':res[0].size=='480'?'SD':'HD');
    		jQuery("#new-tag-muviquality").val(res[0].quality+",");
    		jQuery("#new-tag-muvisubtitle").val(res[0].subtitle+",");
    		jQuery("#new-tag-muvisize").val(res[0].size+",");
    		jQuery("#idmuvi-core-id").val(res[0].imdb);
    		jQuery("#opsi-player1").val((res[0].fembed));
    		jQuery("#opsi-player4").val(res[0].drive);
    		jQuery("#opsi-player2").val(res[0].uptobox);
    		jQuery("#opsi-player6").val(res[0].storage);
    		jQuery('#opsi-subindo').val('');
    		
    		addHostStatus('fembed', res[0].fembed);
            addHostStatus('drive', res[0].drive);
            addHostStatus('uptobox', res[0].uptobox);
            addHostStatus('storage', res[0].storage);
    	})
    }else{
    	jQuery.get("https://dash.fath.xyz/api/data.php?act=id&s="+jQuery('#fath-input-v_id').val(),(res)=>{
    		if(res[0].id==null||res[0].id=="")alert("NULL");
    		jQuery('#opsi-quality').val(/CAM/.test(res[0].quality)?'CAM':res[0].size=='480'?'SD':'HD');
    		jQuery("#new-tag-muviquality").val(res[0].quality+",");
    		jQuery("#new-tag-muvisubtitle").val(res[0].subtitle+",");
    		jQuery("#new-tag-muvisize").val(res[0].size+",");
    		jQuery("#idmuvi-core-id").val(res[0].imdb);
    		jQuery("#opsi-player1").val((res[0].fembed));
    		jQuery("#opsi-player4").val(res[0].drive);
    		jQuery("#opsi-player2").val(res[0].uptobox);
    		jQuery("#opsi-player6").val(res[0].storage);
    		jQuery('#opsi-subindo').val('');
    		
    		addHostStatus('fembed', res[0].fembed);
            addHostStatus('drive', res[0].drive);
            addHostStatus('uptobox', res[0].uptobox);
            addHostStatus('storage', res[0].storage);
    	})
    }
}

if(jQuery("#fath-input-v_id").val()){data_grab()}
jQuery(document).on("input", "#fath-input-v_id", function() {data_grab()});

jQuery(document).on("click", "#fath-v_id", function() {
    jQuery('#post_author_override').val("6");
    date_updater();
    
    jQuery('#opsi-player5').val('');
    jQuery('#opsi-player3').val('');
    jQuery('#opsi-subeng').val('');
    if (jQuery('#fath-input-v_id').val()==""){
    	let uris = (location.href).match(/post=+.+&action/g);
    	jQuery.get("https://dash.fath.xyz/api/data.php?act=uri&s="+uris[0],(res)=>{
    		if(res[0].id==null||res[0].id=="")alert("NULL");
    		jQuery('#opsi-quality').val(/CAM/.test(res[0].quality)?'CAM':res[0].size=='480'?'SD':'HD');
    		jQuery("#new-tag-muviquality").val(res[0].quality+",");
    		jQuery("#new-tag-muvisubtitle").val(res[0].subtitle+",");
    		jQuery("#new-tag-muvisize").val(res[0].size+",");
    		jQuery("#idmuvi-core-id").val(res[0].imdb);
    		jQuery("#opsi-player1").val(res[0].fembed);
    		jQuery("#opsi-player4").val(res[0].drive);
    		jQuery("#opsi-player2").val(res[0].uptobox);
    		jQuery("#opsi-player6").val(res[0].storage);
    		jQuery('#opsi-subindo').val('');
    		
    		addHostStatus('fembed', res[0].fembed);
            addHostStatus('drive', res[0].drive);
            addHostStatus('uptobox', res[0].uptobox);
            addHostStatus('storage', res[0].storage);
    	})
    }else{
    	jQuery.get("https://dash.fath.xyz/api/data.php?act=id&s="+jQuery('#fath-input-v_id').val(),(res)=>{
    		if(res[0].id==null||res[0].id=="")alert("NULL");
    		jQuery('#opsi-quality').val(/CAM/.test(res[0].quality)?'CAM':res[0].size=='480'?'SD':'HD');
    		jQuery("#new-tag-muviquality").val(res[0].quality+",");
    		jQuery("#new-tag-muvisubtitle").val(res[0].subtitle+",");
    		jQuery("#new-tag-muvisize").val(res[0].size+",");
    		jQuery("#idmuvi-core-id").val(res[0].imdb);
    		jQuery("#opsi-player1").val(res[0].fembed);
    		jQuery("#opsi-player4").val(res[0].drive);
    		jQuery("#opsi-player2").val(res[0].uptobox);
    		jQuery("#opsi-player6").val(res[0].storage);
    		jQuery('#opsi-subindo').val('');
    		
    		addHostStatus('fembed', res[0].fembed);
            addHostStatus('drive', res[0].drive);
            addHostStatus('uptobox', res[0].uptobox);
            addHostStatus('storage', res[0].storage);
    	})
    }
})

jQuery(document).on("click", "#fath-imdb", function() {
	var valImdbiid = jQuery('input[name=imdbID]').val();
	var languange = "&language=en&include_image_language=en,null";
	var apikey = "&api_key=12ca80a2dd4987070cd5c798c9770c42";
	var target = document.URL;
	var isoCountries = {'AF':'Afghanistan','AX':'Aland Islands','AL':'Albania','DZ':'Algeria','AS':'American Samoa','AD':'Andorra','AO':'Angola','AI':'Anguilla','AQ':'Antarctica','AG':'Antigua And Barbuda','AR':'Argentina','AM':'Armenia','AW':'Aruba','AU':'Australia','AT':'Austria','AZ':'Azerbaijan','BS':'Bahamas','BH':'Bahrain','BD':'Bangladesh','BB':'Barbados','BY':'Belarus','BE':'Belgium','BZ':'Belize','BJ':'Benin','BM':'Bermuda','BT':'Bhutan','BO':'Bolivia','BA':'Bosnia And Herzegovina','BW':'Botswana','BV':'Bouvet Island','BR':'Brazil','IO':'British Indian Ocean Territory','BN':'Brunei Darussalam','BG':'Bulgaria','BF':'Burkina Faso','BI':'Burundi','KH':'Cambodia','CM':'Cameroon','CA':'Canada','CV':'Cape Verde','KY':'Cayman Islands','CF':'Central African Republic','TD':'Chad','CL':'Chile','CN':'China','CX':'Christmas Island','CC':'Cocos (Keeling) Islands','CO':'Colombia','KM':'Comoros','CG':'Congo','CD':'Congo, Democratic Republic','CK':'Cook Islands','CR':'Costa Rica','CI':'Cote D\'Ivoire','HR':'Croatia','CU':'Cuba','CY':'Cyprus','CZ':'Czech Republic','DK':'Denmark','DJ':'Djibouti','DM':'Dominica','DO':'Dominican Republic','EC':'Ecuador','EG':'Egypt','SV':'El Salvador','GQ':'Equatorial Guinea','ER':'Eritrea','EE':'Estonia','ET':'Ethiopia','FK':'Falkland Islands (Malvinas)','FO':'Faroe Islands','FJ':'Fiji','FI':'Finland','FR':'France','GF':'French Guiana','PF':'French Polynesia','TF':'French Southern Territories','GA':'Gabon','GM':'Gambia','GE':'Georgia','DE':'Germany','GH':'Ghana','GI':'Gibraltar','GR':'Greece','GL':'Greenland','GD':'Grenada','GP':'Guadeloupe','GU':'Guam','GT':'Guatemala','GG':'Guernsey','GN':'Guinea','GW':'Guinea-Bissau','GY':'Guyana','HT':'Haiti','HM':'Heard Island & Mcdonald Islands','VA':'Holy See (Vatican City State)','HN':'Honduras','HK':'Hong Kong','HU':'Hungary','IS':'Iceland','IN':'India','ID':'Indonesia','IR':'Iran, Islamic Republic Of','IQ':'Iraq','IE':'Ireland','IM':'Isle Of Man','IL':'Israel','IT':'Italy','JM':'Jamaica','JP':'Japan','JE':'Jersey','JO':'Jordan','KZ':'Kazakhstan','KE':'Kenya','KI':'Kiribati','KR':'Korea','KW':'Kuwait','KG':'Kyrgyzstan','LA':'Lao People\'s Democratic Republic','LV':'Latvia','LB':'Lebanon','LS':'Lesotho','LR':'Liberia','LY':'Libyan Arab Jamahiriya','LI':'Liechtenstein','LT':'Lithuania','LU':'Luxembourg','MO':'Macao','MK':'Macedonia','MG':'Madagascar','MW':'Malawi','MY':'Malaysia','MV':'Maldives','ML':'Mali','MT':'Malta','MH':'Marshall Islands','MQ':'Martinique','MR':'Mauritania','MU':'Mauritius','YT':'Mayotte','MX':'Mexico','FM':'Micronesia, Federated States Of','MD':'Moldova','MC':'Monaco','MN':'Mongolia','ME':'Montenegro','MS':'Montserrat','MA':'Morocco','MZ':'Mozambique','MM':'Myanmar','NA':'Namibia','NR':'Nauru','NP':'Nepal','NL':'Netherlands','AN':'Netherlands Antilles','NC':'New Caledonia','NZ':'New Zealand','NI':'Nicaragua','NE':'Niger','NG':'Nigeria','NU':'Niue','NF':'Norfolk Island','MP':'Northern Mariana Islands','NO':'Norway','OM':'Oman','PK':'Pakistan','PW':'Palau','PS':'Palestinian Territory, Occupied','PA':'Panama','PG':'Papua New Guinea','PY':'Paraguay','PE':'Peru','PH':'Philippines','PN':'Pitcairn','PL':'Poland','PT':'Portugal','PR':'Puerto Rico','QA':'Qatar','RE':'Reunion','RO':'Romania','RU':'Russia','RW':'Rwanda','BL':'Saint Barthelemy','SH':'Saint Helena','KN':'Saint Kitts And Nevis','LC':'Saint Lucia','MF':'Saint Martin','PM':'Saint Pierre And Miquelon','VC':'Saint Vincent And Grenadines','WS':'Samoa','SM':'San Marino','ST':'Sao Tome And Principe','SA':'Saudi Arabia','SN':'Senegal','RS':'Serbia','SC':'Seychelles','SL':'Sierra Leone','SG':'Singapore','SK':'Slovakia','SI':'Slovenia','SB':'Solomon Islands','SO':'Somalia','ZA':'South Africa','GS':'South Georgia And Sandwich Isl.','ES':'Spain','LK':'Sri Lanka','SD':'Sudan','SR':'Suriname','SJ':'Svalbard And Jan Mayen','SZ':'Swaziland','SE':'Sweden','CH':'Switzerland','SY':'Syrian Arab Republic','TW':'Taiwan','TJ':'Tajikistan','TZ':'Tanzania','TH':'Thailand','TL':'Timor-Leste','TG':'Togo','TK':'Tokelau','TO':'Tonga','TT':'Trinidad And Tobago','TN':'Tunisia','TR':'Turkey','TM':'Turkmenistan','TC':'Turks And Caicos Islands','TV':'Tuvalu','UG':'Uganda','UA':'Ukraine','AE':'United Arab Emirates','GB':'Uk','United Kingdom':'Uk','US':'USA','United States':'USA','UM':'United States Outlying Islands','UY':'Uruguay','UZ':'Uzbekistan','VU':'Vanuatu','VE':'Venezuela','VN':'Viet Nam','VG':'Virgin Islands, British','VI':'Virgin Islands, U.S.','WF':'Wallis And Futuna','EH':'Western Sahara','YE':'Yemen','ZM':'Zambia','ZW':'Zimbabwe','SU':'Soviet Union','XC':'Czechoslovakia'};
	if(valImdbiid){
	    jQuery(this).addClass('disabled');
	    jQuery('.spinner-grab').addClass('is-active');
	   // jQuery("#fath-custom-js").append(`<div class="fath-loading"><p><span class="spinner is-active"></span> <strong>Retrieving data please wait</strong></p></div>`);
		jQuery.getJSON( "https://imdb.teman.stream/?ii=" + valImdbiid + "", function(res) {
			let m_names = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec");
			let d = new Date(res.release_date);
			let curr_date = d.getDate();
			let curr_month = d.getMonth();
			let curr_year = d.getFullYear();
			jQuery('input[name=idmuvi-core-released-value]').val(curr_date+" "+m_names[curr_month]+" "+curr_year);
			jQuery('input[id=new-tag-muviyear]').val(curr_year);
			jQuery('input[name=idmuvi-core-year-value]').val(curr_year);
			if(Number(curr_year)>2020)date_updater(true);

			jQuery('input[name=idmuvi-core-title-value]').val(res.title);
			jQuery("input[name=post_title]").val(res.title);
			jQuery('input[name=idmuvi-core-tmdbrating-value]').val(res.vote_average);
			jQuery('input[name=idmuvi-core-tmdbvotes-value]').val(res.vote_count);
			jQuery('input[name=idmuvi-core-runtime-value]').val(res.runtime);
			jQuery('input[id=new-tag-category]').val(res.genres[0].name);
			jQuery('input[id=new-tag-post_tag]').val(res.keywords.keywords[0].name);
			if(res.production_countries!=""){
				if (isoCountries.hasOwnProperty(res.production_countries[0].iso_3166_1)) {jQuery('input[id=new-tag-muvicountry]').val(isoCountries[res.production_countries[0].iso_3166_1]);}
				else {jQuery('input[id=new-tag-muvicountry]').val(res.production_countries[0].iso_3166_1);}
			}
			else{jQuery('input[id=new-tag-muvicountry]').val('undefined,')}
			jQuery('input[id=new-tag-muvisite]').val(res.situs);
			jQuery("input[name=idmuvi-core-lk21slug-value]").val(res.lk21slug);
			jQuery("input[name=post_name]").val(res.slug);
			jQuery('input[id=new-tag-muvicast]').val(res.credits.cast[0].name);
			jQuery('input[id=new-tag-muvidirector]').val(res.credit.directing[0].name);
			jQuery("input[name=idmuvi-core-trailer-value]").val(res.videos.results[0].key);
			jQuery('input[name=idmuvi-core-imdbid-value]').val(res.imdb_id);
			jQuery('input[name=idmuvi-core-tmdbid-value]').val(res.id);
			let desc = (res.overview).replace(/\n/g, "<br />");
			if(tinyMCE) {
				if (jQuery('#wp-'+wpActiveEditor+'-wrap').hasClass('tmce-active') && tinyMCE.get(wpActiveEditor)) {tinyMCE.get(wpActiveEditor).setContent(desc);console.log('has tinyMCE');}
				else {jQuery("textarea[name=content]").val(desc);console.log('not has tinyMCE');}
			}
			if(res.poster_path){
				jQuery.ajax({
					type: "POST",
					url: target,
					data: {'poster_url':res.poster_path},
					success: function(resp){
					    jQuery("input[name=idmuvi-core-poster-value]").val(resp);
					    jQuery('.spinner-grab').removeClass('is-active');
					    
					    jQuery(`.col-5`).html(`<span class="ffm">â˜‘</span><code class="ffm"> Poster</code>`);
                        jQuery(`.col-5`).addClass("ffc_g");
					    
					}
				});
			}else{
			    jQuery("input[name=idmuvi-core-poster-value]").val(res.poster_path);
			    jQuery('.spinner-grab').removeClass('is-active');
			    
			}
		}).done(function() {
			if(jQuery('#title').val()){
				let _title = jQuery('#title').val();
		   		jQuery.get('/wp-admin/admin-ajax.php?action=check-posts-by-title&title='+_title,(_res) =>{
		   			console.log(_res);
		   			if(_res && _res.enable_btn == 'true'){
		   				jQuery('#publish').removeAttr('disabled');
		   			}else if(_res && _res.enable_btn == 'false'){
		   				jQuery("#titlediv").append(`<p><a href="/wp-admin/post.php?action=edit&post=${_res.post_id}" target="_blank" class="page-title-action">Go to Post ID: ${_res.post_id}</a></p>`);
		   				alert('Film sudah ada dengan nama yg sama silahkan di check kembali atau tambahin aka title');
			   		}
		   		})
			}
		}).fail(function() {
		  //  alert( "error" );
		    jQuery('.spinner-grab').removeClass('is-active');
		  //  jQuery(".fath-loading").html('');
		    jQuery(this).removeClass('disabled');
		    jQuery(this).html("!!ERR");
		    
		})
	}
})
console.timeEnd("fath-main-execute");
