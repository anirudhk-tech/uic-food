import React, { useState } from 'react';
import { Checkbox, Text, useTheme } from 'react-native-paper';
import { StyleSheet, View, FlatList } from 'react-native';


interface CheckProps {
    option: string;
}

const Check: React.FC<CheckProps> = ({ option }) => {
    const [checked, setChecked] = useState(false);
    const theme = useTheme();

    return (
        <View style={checkStyles.container}>
            <Checkbox
            status={checked ? 'checked' : 'unchecked'}
            onPress={() => setChecked(prev => !prev)}
            uncheckedColor={theme.colors.secondary}
            color={theme.colors.tertiary}
            />
            <Text style={[checkStyles.text, { color: theme.colors.secondary }]}>{option}</Text>
        </View>
    );
};

const checkStyles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    text: {
        fontFamily: 'Montserrat',
    }
})

interface CheckerProps {
    options: Array<string>;
};

export const Checker: React.FC<CheckerProps> = ({ options }) => {
    const data = options.map((option, idx) => ({ id: idx.toString(), label: option }));
    const renderItem = ({ item }: { item: { label: string } }) => {
        return (
            <Check option={item.label}/>
        );
    };

    return (
        <FlatList
        data={data}
        renderItem={renderItem}
        numColumns={2}
        keyExtractor={item => item.id}/>
    );
};