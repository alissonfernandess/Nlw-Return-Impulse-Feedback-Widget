import { Image, Text, TouchableOpacity, View } from "react-native";

import successImg from '../../assets/success.png';
import { Copyright } from "../Copyright";
import { styles } from "./styles";

interface Props {
  onSendAnotherFeedback: () => void;
}

export function Success({ onSendAnotherFeedback }: Props) {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={successImg}
      />

      <Text style={styles.title}>Agradecemos o feedback!</Text>

      <TouchableOpacity
        onPress={onSendAnotherFeedback}
        style={styles.button}
      >
        <Text style={styles.buttonTitle}>Quero enviar outro</Text>
      </TouchableOpacity>

      <Copyright />
    </View>
  )
}