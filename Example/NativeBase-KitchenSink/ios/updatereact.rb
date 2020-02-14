
# Helper to fix React libraries issues not patched yet
def change_lines_in_file(file_path, &change)
  print "Fixing #{file_path}...\n"

  contents = []

  file = File.open(file_path, 'r')
  file.each_line do | line |
    contents << line
  end
  file.close

  File.open(file_path, 'w') do |f|
    f.puts(change.call(contents))
  end
end

puts "Due to https://github.com/software-mansion/react-native-gesture-handler/issues/816"
change_lines_in_file('./node_modules/react-native-gesture-handler/ios/RNGestureHandlerManager.m') do |lines|
  lines.map { |line| line.include?("#import <React/RCTRootContentView.h>") ? '#import "RCTRootContentView.h"' : line }
end
