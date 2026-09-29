/**
 * Explorer Station photobooth receiver.
 *
 * Receives a strip from the portfolio's photobooth and emails it to you with
 * the image attached. Runs on your own Google account — free, no third-party
 * service, no paid tier.
 *
 * Setup lives in README.md next to this file.
 */

// Where the strips get delivered.
var RECIPIENT = 'yessicasule@gmail.com';

// Reject anything larger than this. A strip is normally 300-900 KB as JPEG;
// the cap is here because the deployment URL is public.
var MAX_BYTES = 5 * 1024 * 1024;

// Most a single visitor-facing endpoint should send in a day. Consumer Gmail
// allows 100 recipients/day, so this stays well inside the quota.
var MAX_PER_DAY = 40;

function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return reply('error: empty request');
    }

    var body = JSON.parse(e.postData.contents);
    var image = body.image;
    if (!image || typeof image !== 'string') {
      return reply('error: no image');
    }

    // base64 inflates by ~4/3; check before decoding so a huge payload never
    // gets expanded in memory.
    if (image.length * 0.75 > MAX_BYTES) {
      return reply('error: too large');
    }

    if (overDailyLimit()) {
      return reply('error: daily limit reached');
    }

    var from = (body.from || '').toString().slice(0, 60).trim();
    var who = from || 'Someone';

    var blob = Utilities.newBlob(
      Utilities.base64Decode(image),
      'image/jpeg',
      'explorer-station-' + stamp() + '.jpg'
    );

    MailApp.sendEmail({
      to: RECIPIENT,
      subject: 'Photobooth: ' + who + ' visited the Explorer Station',
      body:
        who + ' took a photo strip at your Explorer Station.\n\n' +
        'Sent ' + new Date().toLocaleString() + '\n' +
        'The strip is attached.',
      attachments: [blob]
    });

    return reply('ok');
  } catch (err) {
    return reply('error: ' + err);
  }
}

/** A GET is handy for checking the deployment is live in a browser. */
function doGet() {
  return reply('photobooth receiver is running');
}

function reply(text) {
  return ContentService.createTextOutput(text).setMimeType(
    ContentService.MimeType.TEXT
  );
}

function stamp() {
  return Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyy-MM-dd-HHmm');
}

/** Rolling per-day counter, so a public URL cannot flood the inbox. */
function overDailyLimit() {
  var props = PropertiesService.getScriptProperties();
  var today = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyy-MM-dd');
  var key = 'count-' + today;
  var count = Number(props.getProperty(key) || '0');
  if (count >= MAX_PER_DAY) return true;
  props.setProperty(key, String(count + 1));
  return false;
}
