let windowWidth = $(window).width();
const handleTouchMove = function (ev) {
	ev.preventDefault();
}

const communityInitWidth = function () {
	if ($('#communityInitWidth .community-item').length > 0) {
		let communityItems = $('#communityInitWidth .community-item');
		$.map(communityItems, function (communityItem) {
			let communityItemLi = $(communityItem).find('.community-item_list ul li');
			if (communityItemLi.length === 1) {
				communityItemLi.closest('.community-item_list').css('width', 'calc(85px)');
			} else if (communityItemLi.length === 2) {
				communityItemLi.closest('.community-item_list').css('width', 'calc(300px * 2 / 3)');
			}
		});
	}
}

$(function () {
	Waves.init();

	communityInitWidth();
});