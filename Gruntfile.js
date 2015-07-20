module.exports = function (grunt) {
	grunt.initConfig({

		config: {
			bowerOutput: 'dist/jsonDiffJasmineMatcher.js',
			nodeOutput: 'index.js'
		},
		
		concat: {
			dist: {
				src: [
					'src/header.js',
					'src/diffHelpers.js',
					'src/jasmineCustomMatchers.js',
					'src/footer.js'
				],
				dest: '<%= config.bowerOutput %>',
				nonull: true
			},
			node: {
				src: [
					'src/diffHelpers.js',
					'src/nodeWrapper.js'
				],
				dest: '<%= config.nodeOutput %>'
			}
		},

		jsbeautifier: {
			dist: {
				src: '<%= config.bowerOutput %>'
			},
			node: {
				src: '<%= config.nodeOutput %>'
			}
		}

	});

	['grunt-contrib-concat', 'grunt-jsbeautifier'].forEach(grunt.loadNpmTasks);

	grunt.registerTask('build', ['concat', 'jsbeautifier']);

};
