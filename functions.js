const MAX_CARDS_IN_FP_DECK = 10;
const MAX_CARDS_IN_FP_ZONE = 10;
const CHARGE_COUNT_PER_TURN = 3;

async function initFpDeck() {
	const createCount = MAX_CARDS_IN_FP_DECK - (cards.FP_Deck?.length ?? 0);
	console.log(`Attempting to create ${createCount} "FP Charge" cards.`);
	
	// Create FP cards in player's FP Deck
	for (let count = 0; count < createCount; count++) {
		const card = await functions.createCard("T01", "FP_Deck");
		console.log(card);
	}
}

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
