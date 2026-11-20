/**
 * Page-level loader. It is a child of the flex <main>, which already fills the
 * space between header and footer; with an auto height it stretches to that
 * area and centres the spinner (an explicit h-full would cancel the stretch).
 */
export default function MainLoader() {
	return (
		<div className={'w-full flex items-center justify-center'}>
			<div className={'loader'}></div>
		</div>
	);
}
