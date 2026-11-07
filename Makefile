SRC_DIR := src
OUT_DIR := out

SOURCES := $(wildcard $(SRC_DIR)/*.md)
OUTPUTS := $(patsubst $(SRC_DIR)/%.md,$(OUT_DIR)/%.html,$(SOURCES))

.PHONY: all build check deps test clean package ci lint coverage

all: check test

node_modules: package.json package-lock.json
	npm ci
	@touch node_modules

deps: node_modules

$(OUT_DIR)/%.html: $(SRC_DIR)/%.md package-lock.json | $(OUT_DIR) node_modules
	@echo "  BUILD $< -> $@"
	@npm run --silent build -- $< $@

$(OUT_DIR):
	mkdir -p $@

check:
	@test -d "$(SRC_DIR)" || { echo "Error: source directory missing"; exit 1; }
	@test -n "$(SOURCES)" || { echo "Error: no .md files found"; exit 1; }
	@echo "Check passed: $(words $(SOURCES)) source file(s)"

build: $(OUTPUTS)

test: build
	@npm test --silent

clean:		## remove all generated files
	rm -rf $(OUT_DIR) coverage *.tgz

package: test
	npm pack

lint: node_modules  ## static analysis: seconds, so it runs first
	npm run --silent lint

coverage: build		## the tests again, writing coverage/lcov.info for SonarQube
	@mkdir -p coverage
	node --test --experimental-test-coverage \
	  --test-reporter=spec --test-reporter-destination=stdout \
	  --test-reporter=lcov --test-reporter-destination=coverage/lcov.info

ci: clean deps check lint test package  ## everything, in pipeline order

