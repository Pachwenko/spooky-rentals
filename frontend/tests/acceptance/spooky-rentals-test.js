import { module, test } from 'qunit';
import { click, find, visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { setupMirage } from 'ember-cli-mirage/test-support';

module('Acceptance | spooky rentals', function (hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  hooks.beforeEach(function () {
    this.rental = this.server.create('rental');
    this.server.createList('rental', 2);
  });

  test('visiting /', async function (assert) {
    await visit('/');
    assert.strictEqual(currentURL(), '/');
    assert.dom('nav').exists();
    assert.dom('h1').hasText('SpookyRentals');
    assert.dom('h2').hasText('Welcome to Spooky Rentals!');
    assert.dom('.jumbo a.button').hasText('About Us');
    await click('.jumbo a.button');
  });

  test('viewing the details of a rental property', async function (assert) {
    await visit('/');
    assert.dom('.rental').exists({ count: 3 });
    await click('.rental:first-of-type a');
    assert.strictEqual(currentURL(), `/rentals/${this.rental.id}`);
  });

  test('visiting /rentals/grand-old-mansion', async function (assert) {
    await visit(`/rentals/${this.rental.id}`);
    assert.strictEqual(currentURL(), `/rentals/${this.rental.id}`);
    assert.dom('nav').exists();
    assert.dom('h1').containsText('SpookyRentals');
    assert.dom('h2').containsText(this.rental.title);
    assert.dom('.rental.detailed').exists();
    assert.dom('.share.button').hasText('Share on Twitter');
    let button = find('.share.button');
    let tweetURL = new URL(button.href);
    assert.strictEqual(tweetURL.host, 'twitter.com');
    assert.strictEqual(
      tweetURL.searchParams.get('url'),
      `${window.location.origin}/rentals/${this.rental.id}`
    );
  });

  test('visiting /about', async function (assert) {
    await visit('/about');
    assert.strictEqual(currentURL(), '/about');
    assert.dom('nav').exists();
    assert.dom('h1').hasText('SpookyRentals');
    assert.dom('h2').hasText('About Spooky Rentals');
    assert.dom('.jumbo a.button').hasText('Contact Us');
    await click('.jumbo a.button');
    assert.strictEqual(currentURL(), '/getting-in-touch');
  });

  test('visiting /getting-in-touch', async function (assert) {
    await visit('/getting-in-touch');
    assert.strictEqual(currentURL(), '/getting-in-touch');
    assert.dom('nav').exists();
    assert.dom('h1').hasText('SpookyRentals');
    assert.dom('h2').hasText('Contact Us');
    assert.dom('.jumbo a.button').hasText('About');
    await click('.jumbo a.button');
    assert.strictEqual(currentURL(), '/about');
  });

  test('navigating using the nav-bar', async function (assert) {
    await visit('/');
    assert.dom('nav').exists();
    assert.dom('nav a.menu-index').hasText('SpookyRentals');
    assert.dom('nav a.menu-about').hasText('About');
    assert.dom('nav a.menu-contact').hasText('Contact');
    await click('nav a.menu-about');
    assert.strictEqual(currentURL(), '/about');
    await click('nav a.menu-contact');
    assert.strictEqual(currentURL(), '/getting-in-touch');
    await click('nav a.menu-index');
    assert.strictEqual(currentURL(), '/');
  });
});
