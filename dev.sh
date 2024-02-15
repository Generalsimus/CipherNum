#!/bin/bash
tsc -w --project tsconfig.common.json &
tsc -w --project tsconfig.global.json &
wait