import { Request, Response } from "express";
import Stripe from "stripe";

import { logger } from "../utils/logger";
import { stripe } from "../utils/stripe";

/**
 * POST /api/webhooks/stripe
 * Stripe webhook handler.
 * 
 * NOTE: Car purchase payments have been removed. This webhook is now
 * reserved for future use with ad/campaign payments or other platform fees.
 */
export async function handleStripeWebhook(req: Request, res: Response) {
	const sig = req.headers["stripe-signature"];
	const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

	let event: Stripe.Event;

	try {
		if (!sig || !webhookSecret) {
			logger.error("[Stripe Webhook] Missing signature or secret");
			return res.status(400).send("Webhook Error: Missing signature or secret");
		}

		event = stripe.webhooks.constructEvent(req.rawBody!, sig, webhookSecret);
	} catch (err) {
		const message = err instanceof Error ? err.message : "Unknown error";
		logger.error("[Stripe Webhook] Error", { message });
		return res.status(400).send(`Webhook Error: ${message}`);
	}

	// Handle the event
	switch (event.type) {
		case "payment_intent.succeeded": {
			// Car purchase flow has been removed. 
			// This webhook is reserved for future ad/campaign payments.
			logger.info("[Stripe Webhook] Payment intent succeeded (no action taken)", {
				paymentId: event.data.object.id,
			});
			break;
		}
		default:
			logger.info("[Stripe Webhook] Unhandled event type", {
				eventType: event.type,
			});
	}

	res.json({ received: true });
}
