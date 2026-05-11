<?php

return [
    'temporary_file_upload' => [
        /*
         * Keep the Livewire temporary upload limit aligned with the PHP upload
         * ceiling we expect on local/shared-hosting environments.
         */
        'rules' => ['required', 'file', 'max:10240'],
        'max_upload_time' => 10,
    ],
];

