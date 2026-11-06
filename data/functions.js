const MAX_CARDS_IN_FP_DECK = 10;
const MAX_CARDS_IN_FP_ZONE = 10;
const CHARGE_COUNT_PER_TURN = 3;

async function doChargePhase(bonusCharge = 0) {
	// Skip charging if it's not your turn
	if (!game.turn.isMyTurn) return;

	// Calculate Charge count
	const cardsInFpDeck = cards.FP_Deck?.length ?? 0;
	const spaceInFpZone = MAX_CARDS_IN_FP_DECK - (cards.FP_Zone?.length ?? 0);
	const chargeCount = Math.min(
		cardsInFpDeck,
		spaceInFpZone,
		CHARGE_COUNT_PER_TURN + bonusCharge,
	);
	console.log(`Attempting to charge ${chargeCount} cards. (${cardsInFpDeck}, ${spaceInFpZone}, ${CHARGE_COUNT_PER_TURN + bonusCharge})`);

	if (chargeCount > 0) {
		// Automatically charge cards
		await functions.drawFromExtraDeck("FP_Deck", chargeCount, false, "FP_Zone");

		// Re-draw the field
		await functions.repositionCards();
	}
}

// Swap Zones
const ZONES_LIST = [
	"Vivosaur_Zone_Left",
	"Vivosaur_Zone_Center",
	"Vivosaur_Zone_Right"
];

async function swapZones(first, second) {
	if (!ZONES_LIST.includes(first) || !ZONES_LIST.includes(second)) return;

	const cardFirst = cards[first]?.[0] ?? null;
	const cardSecond = cards[second]?.[0] ?? null;
	await functions.moveCard(cardFirst, second);
	await functions.moveCard(cardSecond, first);
}
