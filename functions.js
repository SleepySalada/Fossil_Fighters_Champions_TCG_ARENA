const MAX_CARDS_IN_FP_DECK = 10;
const MAX_CARDS_IN_FP_ZONE = 10;
const CHARGE_COUNT_PER_TURN = 3;

async function initFpDeck() {
	// Create FP cards in player's FP Deck
	const createCount = MAX_CARDS_IN_FP_DECK - (game.data.FP_Deck?.length ?? 0);
	for (let count = 0; count < createCount; count++) {
		await functions.createCard("T01", "FP_Deck");
	}
}

async function doChargePhase(bonusCharge = 0) {
	// Skip charging if it's not your turn
	if (!game.turn.isMyTurn) return;

	// Calculate Charge count
	const cardsInFpDeck = game.data.FP_Deck?.length ?? 0;
	const spaceInFpZone = MAX_CARDS_IN_FP_DECK - (game.data.FP_Zone?.length ?? 0);
	const chargeCount = Math.min(
		cardsInFpDeck,
		spaceInFpZone,
		CHARGE_COUNT_PER_TURN + bonusCharge,
	);

	if (chargeCount > 0) {
		// Automatically charge cards
		await functions.drawFromExtraDeck("FP_Deck", chargeCount, false, "FP_Zone");

		// Re-draw the field
		await functions.repositionCards();
	}
}
