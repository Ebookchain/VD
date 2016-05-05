import Ember from 'ember';
import { storageFor } from 'ember-local-storage';

export default Ember.Service.extend({
    settings: storageFor('settings'),

    isNotificationsEnabled: Ember.computed.alias('settings.isNotificationsEnabled'),
    contributors: Ember.computed.alias('settings.contributors'),

    zoomFactor: Ember.computed({
        get() {
            return this.get('settings.zoomFactor');
        },
        
        set(k, v) {
            let frame = require('web-frame');
            let setting = (v >= 50 && v <= 300) ? v : 100;

            frame.setZoomFactor(setting / 100);
            this.set('settings.zoomFactor', setting);
        }
    }),

    setupContributors: function () {
        Ember.$.getJSON('contributors.json').then(
            (data) => this.set('settings.contributors', data)
        );
    }.on('init'),

    setupZoom() {
        this.set('zoomFactor', this.get('zoomFactor'));
    }
});
