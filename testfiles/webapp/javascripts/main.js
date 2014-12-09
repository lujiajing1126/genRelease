$(function(){
	var height = document.documentElement.clientHeight,
		SearchTable = function() {
			var search = location.search,
				search_str = search.slice(1),
				search_arr = search_str.split('&');
			this.search_params = {};
			for(var i=0,len=search_arr.length;i<len;i++) {
				var tmp = search_arr[i].split('=');
				this.search_params[tmp[0]] = tmp[1];
			}
		};
	SearchTable.prototype.get = function(key) {
		return this.search_params[key];
	};
	$('body').scrollTop(0);
	var Search = new SearchTable(),
		userId = Search.get('user_id'),
		accessToken = Search.get('access_token');
	$('.wrapper').height(height);
	$('.wrapper > .progress').css({top: height/2 - 60});
	Thenjs(function(cont){
		var isLoaded = false;
		WhosvBrowserApi.ready(function(api){
			// 兼容
			if(typeof api.getUserInfo === 'function') {
				api.getUserInfo(accessToken,userId,function(data){
					isLoaded = true;
					var user = JSON.parse(data);
					console.log(user.is_friend);
					user['gender'] = data.sex == 1 ? 'male':'female';
					user['id'] = userId;
					$(document).on('touchstart','img.avatar',function(){
						api.invoke('album',[user['my_avatar']],[user['mini_my_avatar']]);					
					});
					$('div#userinfo').html(template('userinfo_template',user));
					$('ul#extinfo-list').html(template('extendinfo_template',user));
					$('div#userinfo').show();
					$('div#extendinfo').show();
					$('body > img').height(document.body.scrollHeight);
					$('.wrapper').hide();
					$('html,body').css({overflow: 'visible'});
				});
			}
		});
		cont(null,isLoaded);
	}).then(function(cont,isLoaded){
		$.ajax({
			url: '/api/v2/users/'+userId+'/render?access_token='+accessToken,
			dataType: 'json',
			success: function(data){
				console.log(data);
				data['gender'] = data.sex == 1 ? 'male':'female';
				data['id'] = userId;
                WhosvBrowserApi.ready(function(api){
                    $(document).off('touchstart','img.avatar');
                    $(document).on('touchstart','img.avatar',function(){
                        api.invoke('album',[data['my_avatar']],[data['mini_my_avatar']]);
                    });
                });
                $('div#userinfo').html(template('userinfo_template',data));
				$('ul#extinfo-list').html(template('extendinfo_template',data));
				if(!isLoaded) {
					$('div#userinfo').show();
					$('div#extendinfo').show();
					$('body > img').height(document.body.scrollHeight);
					setTimeout(function(){
						$('.wrapper').hide();
						$('html,body').css({overflow: 'visible'});
					},2000);
				}
			},
			error: function(xhr,type){
				console.log(xhr);
			}
		});
	}).fail(function(cont,error){
		console.log(error);
		console.log("Load complete!");
	});
});