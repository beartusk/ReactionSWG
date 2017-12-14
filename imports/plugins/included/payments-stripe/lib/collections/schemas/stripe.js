import { SimpleSchema } from "meteor/aldeed:simple-schema";
import { PackageConfig } from "/lib/collections/schemas/registry";
import { registerSchema } from "@reactioncommerce/reaction-collections";
/*
 *  Meteor.settings.stripe =
 *    mode: false  #sandbox
 *    api_key: ""
 *  see: https://stripe.com/docs/api
 */

const StripeConnectAuthorizationCredentials = new SimpleSchema({
  token_type: { // eslint-disable-line camelcase
    type: String
  },
  stripe_publishable_key: { // eslint-disable-line camelcase
    type: String
  },
  scope: {
    type: String
  },
  livemode: {
    type: Boolean
  },
  stripe_user_id: { // eslint-disable-line camelcase
    type: String
  },
  refresh_token: { // eslint-disable-line camelcase
    type: String
  },
  access_token: { // eslint-disable-line camelcase
    type: String
  }
});

registerSchema("StripeConnectAuthorizationCredentials", StripeConnectAuthorizationCredentials);

export const StripePackageConfig = new SimpleSchema([
  PackageConfig, {
    "settings.mode": {
      type: Boolean,
      defaultValue: false
    },
    "settings.api_key": {
      type: String,
      label: "API Secret Key"
    },
    // This field only applies to marketplace style orders where a payment is taken on behalf of another store
    "settings.applicationFee": {
      type: Number,
      label: "Percentage Application Fee",
      optional: true,
      defaultValue: 5
    },
    "settings.connectAuth": {
      type: StripeConnectAuthorizationCredentials,
      label: "Connect Authorization Credentials",
      optional: true
    },
    "settings.reaction-stripe.support": {
      type: Object,
      label: "Payment provider supported methods"
    },
    "settings.reaction-stripe.support.authorize": {
      type: Boolean,
      defaultValue: true,
      label: Authorize
    },
    "settings.reaction-stripe.support.de_authorize": {
      type: Boolean,
      defaultValue: false,
      label: De-Authorize
    },
    "settings.reaction-stripe.support.capture": {
      type: Boolean,
      defaultValue: true,
      label: Capture
    },
    "settings.reaction-stripe.support.refund": {
      type: Boolean,
      defaultValue: true,
      label: Refund
    },

    // Public Settings
    "settings.public.client_id": {
      type: String,
      label: "Public Client ID",
      optional: true
    }
  }
]);

registerSchema("StripePackageConfig", StripePackageConfig);

export const StripePayment = new SimpleSchema({
  payerName: {
    type: String,
    label: "Cardholder name"
  },
  cardNumber: {
    type: String,
    min: 13,
    max: 16,
    label: "Card number"
  },
  expireMonth: {
    type: String,
    max: 2,
    label: "Expiration month"
  },
  expireYear: {
    type: String,
    max: 4,
    label: "Expiration year"
  },
  cvv: {
    type: String,
    max: 4,
    label: "CVV"
  }
});

registerSchema("StripePayment", StripePayment);
