module.exports = function (grunt) {
	grunt.initConfig({

		config: {
			output: 'dist/jsonDiffJasmineMatcher.js'
		},
		
		concat: {
			dist: {
				src: [
					'src/header.js',
					'src/diffHelpers.js',
					'src/jasmineCustomMatchers.js',
					'src/footer.js'
				],
				dest: '<%= config.output %>',
				nonull: true
			}
		},

		jsbeautifier: {
			dist: {
				src: '<%= config.output %>'
			}
		}

	});

	['grunt-contrib-concat', 'grunt-jsbeautifier'].forEach(grunt.loadNpmTasks);

	grunt.registerTask('build', ['concat', 'jsbeautifier']);

};
