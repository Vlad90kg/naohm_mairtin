<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Contact Form (Formspree) Default Endpoint
    |--------------------------------------------------------------------------
    |
    | This value seeds default contact page content when no CMS value exists.
    | Editors can override it in Filament: Content -> Contact Page Content
    | -> Form -> endpoint.
    |
    */
    'formspree_endpoint' => env('CONTACT_FORMSPREE_ENDPOINT', 'https://formspree.io/f/mwvyqgdn'),
];

